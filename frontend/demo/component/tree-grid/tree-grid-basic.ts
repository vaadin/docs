import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import { GridDataProviderCallback, GridDataProviderParams } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople, PeopleOptions } from '../../domain/DataService';
import { html } from 'lit-html';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';

@customElement('tree-grid-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  async dataProvider(params: GridDataProviderParams, callback: GridDataProviderCallback) {
    const peopleOptions: PeopleOptions = {
      count: params.pageSize,
      startIndex: params.page * params.pageSize,
      managerId: params.parentItem ? (params.parentItem as Person).id : null
    };

    const { people, hierarhcyLevelSize } = await getPeople(peopleOptions);

    const startIndex = params.page * params.pageSize;
    const pageItems = people.slice(startIndex, startIndex + params.pageSize);
    callback(pageItems, hierarhcyLevelSize);
  }

  render() {
    return html`
      <vaadin-grid .dataProvider=${this.dataProvider}>
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
