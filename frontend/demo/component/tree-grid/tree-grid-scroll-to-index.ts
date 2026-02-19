import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-tree-column.js';
import '@vaadin/horizontal-layout';
import '@vaadin/integer-field';
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import type {
  Grid,
  GridActiveItemChangedEvent,
  GridBodyRenderer,
  GridDataProviderCallback,
  GridDataProviderParams,
} from '@vaadin/grid';
import type { IntegerFieldChangeEvent } from '@vaadin/integer-field';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('tree-grid-scroll-to-index')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
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
  private idToIndexes = new Map<number, number[]>();

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

    // Cache the index address of each person for demo purposes
    people.forEach((person, idx) => {
      const index = startIndex + idx;
      const parentIndexes = params.parentItem
        ? (this.idToIndexes.get(params.parentItem.id) ?? [])
        : [];
      const indexes = [...parentIndexes, index];
      this.idToIndexes = new Map(this.idToIndexes).set(person.id, indexes);
    });

    if (!this.expandedItems && !params.parentItem) {
      // Expand the root level by default
      this.expandedItems = people;
    }

    callback(people, hierarchyLevelSize);
  }

  private indexRenderer: GridBodyRenderer<Person> = (root, _, { item }) => {
    root.textContent = this.idToIndexes.get(item.id)?.join(', ') ?? '';
  };

  private getSelectedItems(indexes: number[], idToIndexes: Map<number, number[]>) {
    const id = Array.from(idToIndexes.entries()).find(
      ([, idxs]) => idxs[0] === indexes[0] && idxs[1] === indexes[1]
    )?.[0];

    return id ? [{ id }] : [];
  }

  protected override render() {
    return html`
      <vaadin-grid
        item-id-path="id"
        item-has-children-path="manager"
        .dataProvider="${this.dataProvider}"
        .expandedItems="${this.expandedItems ?? []}"
        .selectedItems="${this.getSelectedItems(this.indexesToScrollTo, this.idToIndexes)}"
        @active-item-changed=${(e: GridActiveItemChangedEvent<Person>) => {
          if (e.detail.value) {
            this.indexesToScrollTo = this.idToIndexes.get(e.detail.value.id) ?? [];
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

      <vaadin-horizontal-layout theme="spacing" style="align-items: flex-end">
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
