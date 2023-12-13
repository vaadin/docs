import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/grid';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import type { GridDragStartEvent, GridDropEvent } from '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-row-reordering')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
  private draggedItem: Person | undefined;

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid
        .items="${this.items}"
        rows-draggable
        drop-mode="between"
        @grid-dragstart="${(event: GridDragStartEvent<Person>) => {
          this.draggedItem = event.detail.draggedItems[0];
        }}"
        @grid-dragend="${() => {
          delete this.draggedItem;
        }}"
        @grid-drop="${(event: GridDropEvent<Person>) => {
          const { dropTargetItem, dropLocation } = event.detail;
          // Only act when dropping on another item
          if (this.draggedItem && dropTargetItem !== this.draggedItem) {
            // Remove the item from its previous position
            const draggedItemIndex = this.items.indexOf(this.draggedItem);
            this.items.splice(draggedItemIndex, 1);
            // Re-insert the item at its new position
            const dropIndex =
              this.items.indexOf(dropTargetItem) + (dropLocation === 'below' ? 1 : 0);
            this.items.splice(dropIndex, 0, this.draggedItem);
            // Re-assign the array to refresh the grid
            this.items = [...this.items];
          }
        }}"
      >
        <vaadin-grid-column
          header="Image"
          flex-grow="0"
          auto-width
          ${columnBodyRenderer(this.avatarRenderer, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  }

  private avatarRenderer: GridColumnBodyLitRenderer<Person> = (person) => html`
    <vaadin-avatar
      img="${person.pictureUrl}"
      name="${person.firstName} ${person.lastName}"
      alt="User avatar"
    ></vaadin-avatar>
  `;
}
// end::snippet[]
