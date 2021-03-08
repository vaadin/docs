import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, query } from 'lit-element';
import { html } from 'lit-html';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-tree-column';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import {
  GridDataProviderCallback,
  GridDataProviderParams,
  GridElement
} from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from '../../domain/DataService';
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

  // async firstUpdated() {
  //   this.managers = (await getPeople({managerId: null}));
  // }

  async dataProvider(params: GridDataProviderParams, callback: GridDataProviderCallback) {
    let people: Person[];

    if (params.parentItem) {
      const manager = params.parentItem as Person;
      people = await getPeople({ managerId: manager.id });
    } else {
      people = await getPeople({ managerId: null });
      this.managers = people;
    }

    const startIndex = params.page * params.pageSize;
    const pageItems = people.slice(startIndex, startIndex + params.pageSize);
    // Inform grid of the requested tree level's full size
    const treeLevelSize = people.length;
    callback(pageItems, treeLevelSize);
  }

  // tag::snippet[]
  @query('vaadin-grid')
  private grid!: GridElement;

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <h2 style="flex: 1; margin-bottom: 0; margin-top: 0;">Employee</h2>
        <vaadin-button
          @click=${() =>
            this.managers && this.managers.forEach(manager => this.grid.expandItem(manager))}
          >Expand All</vaadin-button
        >
        <vaadin-button
          @click=${() =>
            this.managers && this.managers.forEach(manager => this.grid.collapseItem(manager))}
          >Collapse All</vaadin-button
        >
      </vaadin-horizontal-layout>
      <vaadin-grid .dataProvider=${this.dataProvider.bind(this)}>
        <vaadin-grid-tree-column
          path="firstName"
          item-has-children-path="hasChildren"
        ></vaadin-grid-tree-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
  // end::snippet[]
}
