import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, internalProperty, LitElement } from 'lit-element';
import { html } from 'lit-html';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-tree-toggle';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-button/vaadin-button';
import {
  GridColumnElement,
  GridDataProviderCallback,
  GridDataProviderParams,
  GridItemModel
} from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';
import { GridTreeToggleExpandedChanged } from '@vaadin/vaadin-grid/vaadin-grid-tree-toggle';
import { render } from 'lit-html';

@customElement('tree-grid-rich-content')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private expandedItems: Person[] = [];

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

  // tag::snippet[]
  private employeeRenderer = (
    root: HTMLElement,
    _column?: GridColumnElement,
    model?: GridItemModel
  ) => {
    if (model?.item) {
      const person = model.item as Person;

      render(
        html`
          <vaadin-horizontal-layout>
            <vaadin-grid-tree-toggle
              .leaf=${!person.isManager}
              .level=${model.level || 0}
              @expanded-changed=${(e: GridTreeToggleExpandedChanged) => {
                if (e.detail.value) {
                  this.expandedItems = [...this.expandedItems, person];
                } else {
                  this.expandedItems = this.expandedItems.filter(p => p.id !== person.id);
                }
              }}
              .expanded=${!!model.expanded}
            ></vaadin-grid-tree-toggle>
            <img
              .src=${person.pictureUrl}
              style="height: var(--lumo-size-m); width: var(--lumo-size-m); align-self: center;"
            />
            <vaadin-vertical-layout>
              <span>${person.firstName} ${person.lastName}</span>
              <span style="font-size: var(--lumo-font-size-s); color: var(--lumo-contrast-70pct);">
                ${person.profession}
              </span>
            </vaadin-vertical-layout>
          </vaadin-horizontal-layout>
        `,
        root
      );
    }
  };
  contactRenderer(root: HTMLElement, _column?: GridColumnElement, model?: GridItemModel) {
    if (model?.item) {
      const person = model.item as Person;

      render(
        html`
          <vaadin-vertical-layout
            style="color: var(--lumo-primary-color); font-size: var(--lumo-font-size-s);"
          >
            <div>
              <iron-icon icon="vaadin:envelope" style="height: var(--lumo-font-size-m)"></iron-icon>
              <span>${person.email}</span>
            </div>
            <div>
              <iron-icon icon="vaadin:phone" style="height: var(--lumo-font-size-m)"></iron-icon>
              <span>${person.address.phone}</span>
            </div>
          </vaadin-vertical-layout>
        `,
        root
      );
    }
  }
  render() {
    return html`
      <vaadin-grid .dataProvider=${this.dataProvider} .expandedItems=${this.expandedItems}>
        <vaadin-grid-column
          auto-width
          header="Employee"
          .renderer=${this.employeeRenderer}
        ></vaadin-grid-column>
        <vaadin-grid-column
          auto-width
          header="Contact"
          .renderer=${this.contactRenderer}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
  // end::snippet[]
}
