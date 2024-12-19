import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-range-selection')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  private startItem?: Person;

  @state()
  private selectedItems: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  private onItemToggle(event: GridItemToggleEvent<Person>) {
    const { item, selected, shiftKey } = event.detail;

    // If the anchor point isn't set, set it to the current item
    this.startItem ??= item;

    if (shiftKey) {
      // Calculcate the range of items between the anchor point and
      // the current item
      const startIndex = this.items.indexOf(this.startItem!);
      const endIndex = this.items.indexOf(item);
      const rangeItems = this.items.slice(
        Math.min(startIndex, endIndex),
        Math.max(startIndex, endIndex) + 1
      );

      // Update the selection state of the items within the range
      // based on the state of the current item
      const newSelectedItems = new Set(this.selectedItems);
      rangeItems.forEach((rangeItem) => {
        if (selected) {
          newSelectedItems.add(rangeItem);
        } else {
          newSelectedItems.delete(rangeItem);
        }
      });
      this.selectedItems = [...newSelectedItems];
    }

    // Update the anchor point to the current item
    this.startItem = item;
  }

  protected override render() {
    return html`
      <vaadin-grid
        .items="${this.items}"
        .selectedItems="${this.selectedItems}"
        @item-toggle="${this.onItemToggle}"
      >
        <vaadin-grid-selection-column></vaadin-grid-selection-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}
// end::snippet[]
