import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import type { GridItemToggleEvent } from '@vaadin/grid';

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

  @state()
  private selectedItems: Person[] = [];

  private rangeStartItem?: Person;

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  private onItemToggle(event: GridItemToggleEvent<Person>) {
    const { item, selected, shiftKey } = event.detail;

    // If the anchor point isn't set, set it to the current item
    this.rangeStartItem ??= item;

    if (shiftKey) {
      // Calculcate the range of items between the anchor point and
      // the current item
      const rangeStart = this.items.indexOf(this.rangeStartItem!);
      const rangeEnd = this.items.indexOf(item);
      const rangeItems = this.items.slice(
        Math.min(rangeStart, rangeEnd),
        Math.max(rangeStart, rangeEnd) + 1
      );

      // Update the selection state of items within the range
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
    this.rangeStartItem = item;
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
