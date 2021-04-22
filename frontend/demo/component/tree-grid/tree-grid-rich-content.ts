import 'Frontend/demo/init'; // hidden-full-source-line
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
  GridItemModel,
} from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
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
    const { people, hierarchyLevelSize } = await getPeople({
      count: params.pageSize,
      startIndex: params.page * params.pageSize,
      managerId: params.parentItem ? (params.parentItem as Person).id : null,
    });

    callback(people, hierarchyLevelSize);
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
              .leaf=${!person.manager}
              .level=${model.level || 0}
              @expanded-changed=${(e: GridTreeToggleExpandedChanged) => {
                if (e.detail.value) {
                  this.expandedItems = [...this.expandedItems, person];
                } else {
                  this.expandedItems = this.expandedItems.filter((p) => p.id !== person.id);
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
