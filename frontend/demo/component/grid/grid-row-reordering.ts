import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/grid';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { GridDragStartEvent, GridDropEvent } from '@vaadin/grid';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/demo/theme';

// tag::snippet[]
@customElement('grid-row-reordering')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
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
        .dropMode=${this.draggedItem ? 'between' : undefined}
        @grid-dragstart="${(event: GridDragStartEvent<Person>) => {
          this.draggedItem = event.detail.draggedItems[0];
        }}"
        @grid-dragend="${() => {
          this.draggedItem = undefined;
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
    ></vaadin-avatar>
  `;
}
// end::snippet[]
