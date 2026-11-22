import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { GridDragStartEvent, GridSelectedItemsChangedEvent } from '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('grid-drag-multiple-rows')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  // tag::snippet[]
  @state()
  private selectedItems: Person[] = [];

  @state()
  private draggedItems: Person[] = [];

  private startDraggingItems = (event: GridDragStartEvent<Person>) => {
    // The event has only the dragged rows that are visible
    const { draggedItems: visibleItems, setDraggedItemsCount } = event.detail;
    // Dragging a selected row drags the whole selection
    const selectionDragged = this.selectedItems.includes(visibleItems[0]);
    this.draggedItems = selectionDragged ? this.selectedItems : visibleItems;
    if (this.draggedItems.length > 1) {
      // Show the number of all dragged rows in the drag image
      setDraggedItemsCount(this.draggedItems.length);
    }
  };

  protected override render() {
    return html`
      <vaadin-grid
        .items="${this.items}"
        rows-draggable
        .selectedItems="${this.selectedItems}"
        @selected-items-changed="${(event: GridSelectedItemsChangedEvent<Person>) => {
          this.selectedItems = event.detail.value;
        }}"
        @grid-dragstart="${this.startDraggingItems}"
      >
        <vaadin-grid-selection-column></vaadin-grid-selection-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
  // end::snippet[]
}
