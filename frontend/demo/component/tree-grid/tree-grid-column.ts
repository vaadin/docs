import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line (Grid's connector)

import { customElement, internalProperty, LitElement } from 'lit-element';
import { html } from 'lit-html';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-grid/vaadin-grid';
import { GridDataProviderCallback, GridDataProviderParams } from '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('tree-grid-column')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  private managers: Person[] = [];

  private dataProvider = async (
    params: GridDataProviderParams,
    callback: GridDataProviderCallback
  ) => {
    const { people, hierarchyLevelSize } = await getPeople({
      count: params.pageSize,
      startIndex: params.page * params.pageSize,
      managerId: params.parentItem ? (params.parentItem as Person).id : null,
    });

    if (!params.parentItem) {
      this.managers = people;
    }

    callback(people, hierarchyLevelSize);
  };

  // tag::snippet[]
  @internalProperty()
  private expandedItems: unknown[] = [];

  render() {
    return html`
      <vaadin-horizontal-layout
        style="align-items: center; height: var(--lumo-size-xl);"
        theme="spacing"
      >
        <h3 style="flex-grow: 1; margin: 0;">Employee</h3>
        <vaadin-button @click="${() => (this.expandedItems = [...this.managers])}">
          Expand All
        </vaadin-button>
        <vaadin-button @click="${() => (this.expandedItems = [])}">Collapse All</vaadin-button>
      </vaadin-horizontal-layout>

      <vaadin-grid
        .dataProvider="${this.dataProvider}"
        .itemIdPath="${'id'}"
        .expandedItems="${this.expandedItems}"
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
