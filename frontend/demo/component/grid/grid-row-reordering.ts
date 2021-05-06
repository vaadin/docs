import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import { GridDragStartEvent, GridDropEvent, GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render, html } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-row-reordering')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  @internalProperty()
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
        @grid-dragstart="${(event: GridDragStartEvent) => {
          this.draggedItem = event.detail.draggedItems[0] as Person;
        }}"
        @grid-dragend="${() => {
          delete this.draggedItem;
        }}"
        @grid-drop="${(event: GridDropEvent) => {
          const { dropTargetItem, dropLocation } = event.detail;
          const draggedPerson = this.draggedItem as Person;
          // only act when dropping on another item
          if (dropTargetItem !== draggedPerson) {
            // remove the item from its previous position
            const draggedItemIndex = this.items.indexOf(draggedPerson);
            this.items.splice(draggedItemIndex, 1);
            // re-insert the item at its new position
            const dropIndex =
              this.items.indexOf(dropTargetItem as Person) + (dropLocation === 'below' ? 1 : 0);
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

  private avatarRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    render(
      html`
        <img
          style="height: var(--lumo-size-m)"
          src="${(model.item as Person).pictureUrl}"
          alt="User avatar"
        />
      `,
      root
    );
  };
}
// end::snippet[]
