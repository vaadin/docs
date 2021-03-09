import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import { GridDataProviderCallback, GridDataProviderParams } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from '../../domain/DataService';
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
    let results: Person[];

    if (params.parentItem) {
      const manager = params.parentItem as Person;
      results = await getPeople({ managerId: manager.id });
    } else {
      results = await getPeople({ managerId: null });
    }

    const startIndex = params.page * params.pageSize;
    const pageItems = results.slice(startIndex, startIndex + params.pageSize);
    // Inform grid of the requested tree level's full size
    const treeLevelSize = results.length;
    callback(pageItems, treeLevelSize);
  }

  render() {
    return html`
      <vaadin-grid .dataProvider=${this.dataProvider}>
        <vaadin-grid-tree-column
          path="firstName"
          item-has-children-path="isManager"
        ></vaadin-grid-tree-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
  // end::snippet[]
}
