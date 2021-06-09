import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import type {
  GridDragStartEvent,
  GridDropEvent,
  GridItemModel,
} from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-row-reordering')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
  private draggedItem?: Person;

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid
        .items="${this.items}"
        ?rows-draggable="${true}"
        drop-mode="between"
        @grid-dragstart="${(event: GridDragStartEvent<Person>) => {
          this.draggedItem = event.detail.draggedItems[0];
        }}"
        @grid-dragend="${() => {
          delete this.draggedItem;
        }}"
        @grid-drop="${(event: GridDropEvent<Person>) => {
          const { dropTargetItem, dropLocation } = event.detail;
          const draggedPerson = this.draggedItem as Person;
          // only act when dropping on another item
          if (dropTargetItem !== draggedPerson) {
            // remove the item from its previous position
            const draggedItemIndex = this.items.indexOf(draggedPerson);
            this.items.splice(draggedItemIndex, 1);
            // re-insert the item at its new position
            const dropIndex =
              this.items.indexOf(dropTargetItem) + (dropLocation === 'below' ? 1 : 0);
            this.items.splice(dropIndex, 0, draggedPerson);
            // re-assign the array to refresh the grid
            this.items = [...this.items];
          }
        }}"
      >
        <vaadin-grid-column
          header="Image"
          .renderer="${this.avatarRenderer}"
          flex-grow="0"
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  }

  private avatarRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<Person>) => {
    render(
      html`
        <img style="height: var(--lumo-size-m)" src="${model.item.pictureUrl}" alt="User avatar" />
      `,
      root
    );
  };
}
// end::snippet[]
