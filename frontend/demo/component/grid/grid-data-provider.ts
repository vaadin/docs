import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/text-field';
import '@vaadin/icon';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-sort-column.js';
import '@vaadin/grid/vaadin-grid-filter-column.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import type {
  Grid,
  GridDataProviderCallback,
  GridDataProviderParams,
  GridSorterDefinition,
  GridSorterDirection,
} from '@vaadin/grid';
import type { TextFieldValueChangedEvent } from '@vaadin/text-field';

function matchesTerm(value: string, searchTerm: string) {
  return value.toLowerCase().includes(searchTerm.toLowerCase());
}

function compare(a: string, b: string, direction: GridSorterDirection) {
  return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
}

// tag::snippet[]
async function fetchPeople(params: {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortOrders: GridSorterDefinition[];
}) {
  const { page, pageSize, searchTerm, sortOrders } = params;
  const { people } = await getPeople();

  let result = people.map((person) => ({
    ...person,
    fullName: `${person.firstName} ${person.lastName}`,
  }));

  // Filtering
  if (searchTerm) {
    result = result.filter(
      (p) => matchesTerm(p.fullName, searchTerm) || matchesTerm(p.profession, searchTerm)
    );
  }

  // Sorting
  const sortBy = Object.fromEntries(sortOrders.map(({ path, direction }) => [path, direction]));
  if (sortBy.fullName) {
    result = result.sort((p1, p2) => compare(p1.fullName, p2.fullName, sortBy.fullName));
  } else if (sortBy.profession) {
    result = result.sort((p1, p2) => compare(p1.profession, p2.profession, sortBy.profession));
  }

  // Pagination
  const count = result.length;
  result = result.slice(page * pageSize, pageSize);

  return { people: result, count };
}
// end::snippet[]

@customElement('grid-data-provider')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet2[]
  @state()
  private accessor searchTerm = '';

  @query('#grid')
  private accessor grid!: Grid;

  private dataProvider = async (
    params: GridDataProviderParams<Person>,
    callback: GridDataProviderCallback<Person>
  ) => {
    const { page, pageSize, sortOrders } = params;

    const { people, count } = await fetchPeople({
      page,
      pageSize,
      sortOrders,
      searchTerm: this.searchTerm,
    });

    callback(people, count);
  };

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <vaadin-text-field
          placeholder="Search"
          style="width: 50%;"
          @value-changed="${(e: TextFieldValueChangedEvent) => {
            this.searchTerm = (e.detail.value || '').trim();
            this.grid.clearCache();
          }}"
        >
          <vaadin-icon slot="prefix" icon="vaadin:search"></vaadin-icon>
        </vaadin-text-field>
        <vaadin-grid id="grid" .dataProvider="${this.dataProvider}">
          <vaadin-grid-sort-column path="fullName" header="Name"></vaadin-grid-sort-column>
          <vaadin-grid-sort-column path="profession"></vaadin-grid-sort-column>
        </vaadin-grid>
      </vaadin-vertical-layout>
    `;
  }
  // end::snippet2[]
}
