import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line (Grid's connector)

import { customElement, LitElement } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import { GridDataProviderCallback, GridDataProviderParams } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { html } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('tree-grid-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  async dataProvider(params: GridDataProviderParams, callback: GridDataProviderCallback) {
    // The requested page and the full length of the corresponding
    // hierarhcy level is requested from the data service
    const { people, hierarchyLevelSize } = await getPeople({
      count: params.pageSize,
      startIndex: params.page * params.pageSize,
      managerId: params.parentItem ? (params.parentItem as Person).id : null,
    });

    callback(people, hierarchyLevelSize);
  }

  render() {
    return html`
      <vaadin-grid .dataProvider="${this.dataProvider}">
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
