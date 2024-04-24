import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/grid';
import '@vaadin/button';
import '@vaadin/integer-field';
import '@vaadin/horizontal-layout';
import type { IntegerFieldChangeEvent } from '@vaadin/integer-field';
import type {
  Grid,
  GridDataProviderCallback,
  GridDataProviderParams,
  GridBodyRenderer,
  GridActiveItemChangedEvent,
} from '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-tree-column.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('tree-grid-scroll-to-index')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('vaadin-grid')
  private grid!: Grid<Person>;

  @state()
  private expandedItems?: Person[];

  @state()
  private indexesToScrollTo: number[] = [13, 6];

  @state()
  private idToIndexAddress = new Map<number, string>();

  constructor() {
    super();
    this.dataProvider = this.dataProvider.bind(this);
  }

  async dataProvider(
    params: GridDataProviderParams<Person>,
    callback: GridDataProviderCallback<Person>
  ) {
    const startIndex = params.page * params.pageSize;
    const { people, hierarchyLevelSize } = await getPeople({
      count: params.pageSize,
      startIndex,
      managerId: params.parentItem ? params.parentItem.id : null,
    });

    people.forEach((person, idx) => {
      const index = startIndex + idx;
      const parentIndexAddress = params.parentItem
        ? this.idToIndexAddress.get(params.parentItem.id)
        : '';
      const indexAddress = parentIndexAddress ? `${parentIndexAddress}, ${index}` : `${index}`;
      this.idToIndexAddress = new Map(this.idToIndexAddress).set(person.id, indexAddress);
    });

    if (!this.expandedItems && !params.parentItem) {
      // Expand the root level by default
      this.expandedItems = people;
    }

    callback(people, hierarchyLevelSize);
  }

  private indexRenderer: GridBodyRenderer<Person> = (root, _, { item }) => {
    root.textContent = this.idToIndexAddress.get(item.id) ?? '';
  };

  private getSelectedItems(indexes: number[], idToIndexAddress: Map<number, string>) {
    const indexAddress = indexes.join(', ');
    const id = Array.from(idToIndexAddress).find(([_, address]) => address === indexAddress)?.[0];
    return id ? [{ id }] : [];
  }

  protected override render() {
    return html`
      <vaadin-grid
        item-id-path="id"
        item-has-children-path="manager"
        .dataProvider="${this.dataProvider}"
        .expandedItems="${this.expandedItems ?? []}"
        .selectedItems="${this.getSelectedItems(this.indexesToScrollTo, this.idToIndexAddress)}"
        @active-item-changed=${(e: GridActiveItemChangedEvent<Person>) => {
          if (e.detail.value) {
            this.indexesToScrollTo = this.idToIndexAddress
              .get(e.detail.value.id)
              ?.split(', ')
              .map((index) => parseInt(index)) ?? [0, 0];
          }
        }}
      >
        <vaadin-grid-tree-column
          path="firstName"
          width="200px"
          flex-grow="0"
        ></vaadin-grid-tree-column>

        <vaadin-grid-column
          header="Index"
          .renderer=${this.indexRenderer}
          width="80px"
          flex-grow="0"
        ></vaadin-grid-column>

        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>

      <vaadin-horizontal-layout theme="spacing" class="items-end">
        <vaadin-integer-field
          label="Parent index"
          step-buttons-visible
          min="0"
          style="width: 120px"
          .value=${String(this.indexesToScrollTo[0] ?? '')}
          @change=${(e: IntegerFieldChangeEvent) => {
            this.indexesToScrollTo = [parseInt(e.target.value) || 0, this.indexesToScrollTo[1]];
          }}
        ></vaadin-integer-field>

        <vaadin-integer-field
          label="Child index"
          step-buttons-visible
          min="0"
          style="width: 120px"
          .value=${String(this.indexesToScrollTo[1] ?? '')}
          @change=${(e: IntegerFieldChangeEvent) => {
            this.indexesToScrollTo = [this.indexesToScrollTo[0], parseInt(e.target.value) || 0];
          }}
        ></vaadin-integer-field>

        <vaadin-button
          @click=${() => {
            // tag::snippet[]
            this.grid.scrollToIndex(...this.indexesToScrollTo);
            // end::snippet[]
          }}
        >
          Scroll to index: ${this.indexesToScrollTo.join(', ')}
        </vaadin-button>
      </vaadin-horizontal-layout>
    `;
  }
}
