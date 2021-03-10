import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, internalProperty, LitElement } from 'lit-element';
import { html } from 'lit-html';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import { GridDataProviderCallback, GridDataProviderParams } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople, PeopleOptions } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';

@customElement('tree-grid-column')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  private managers?: Person[];

  private dataProvider = async (
    params: GridDataProviderParams,
    callback: GridDataProviderCallback
  ) => {
    const peopleOptions: PeopleOptions = {
      count: params.pageSize,
      startIndex: params.page * params.pageSize,
      managerId: params.parentItem ? (params.parentItem as Person).id : null
    };

    const { people, hierarhcyLevelSize } = await getPeople(peopleOptions);

    if (!params.parentItem) {
      this.managers = people;
    }

    const startIndex = params.page * params.pageSize;
    const pageItems = people.slice(startIndex, startIndex + params.pageSize);
    callback(pageItems, hierarhcyLevelSize);
  };

  // tag::snippet[]
  @internalProperty()
  private expandedItems: unknown[] = [];

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <h2 style="flex: 1; margin-bottom: 0; margin-top: 0;">Employee</h2>
        <vaadin-button
          @click=${() => {
            if (this.managers) {
              this.expandedItems = [...this.managers];
            }
          }}
        >
          Expand All
        </vaadin-button>
        <vaadin-button @click=${() => (this.expandedItems = [])}>Collapse All</vaadin-button>
      </vaadin-horizontal-layout>
      <vaadin-grid
        .dataProvider=${this.dataProvider}
        .itemIdPath=${'id'}
        .expandedItems=${this.expandedItems}
      >
        <vaadin-grid-tree-column
          path="firstName"
          item-has-children-path="manager"
        ></vaadin-grid-tree-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
  // end::snippet[]
}
