import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line (Grid's connector)

import { customElement, internalProperty, LitElement } from 'lit-element';
import { html } from 'lit-html';
import '@vaadin/vaadin-avatar/vaadin-avatar';
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
          <vaadin-grid-tree-toggle
            .leaf="${!person.manager}"
            .level="${model.level || 0}"
            @expanded-changed="${(e: GridTreeToggleExpandedChanged) => {
              if (e.detail.value) {
                this.expandedItems = [...this.expandedItems, person];
              } else {
                this.expandedItems = this.expandedItems.filter((p) => p.id !== person.id);
              }
            }}"
            .expanded="${!!model.expanded}"
          >
            <vaadin-horizontal-layout style="align-items: center;" theme="spacing">
              <vaadin-avatar
                img="${person.pictureUrl}"
                name="${`${person.firstName} ${person.lastName}`}"
              ></vaadin-avatar>
              <vaadin-vertical-layout style="line-height: var(--lumo-line-height-m);">
                <span>${person.firstName} ${person.lastName}</span>
                <span
                  style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);"
                >
                  ${person.profession}
                </span>
              </vaadin-vertical-layout>
            </vaadin-horizontal-layout>
          </vaadin-grid-tree-toggle>
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
            style="font-size: var(--lumo-font-size-s); line-height: var(--lumo-line-height-m);"
          >
            <a href="mailto:${person.email}" style="align-items: center; display: flex;">
              <iron-icon
                icon="vaadin:envelope"
                style="height: var(--lumo-icon-size-s); margin-inline-end: var(--lumo-space-s); width: var(--lumo-icon-size-s);"
              ></iron-icon>
              <span>${person.email}</span>
            </a>
            <a href="tel:${person.address.phone}" style="align-items: center; display: flex;">
              <iron-icon
                icon="vaadin:phone"
                style="height: var(--lumo-icon-size-s); margin-inline-end: var(--lumo-space-s); width: var(--lumo-icon-size-s);"
              ></iron-icon>
              <span>${person.address.phone}</span>
            </a>
          </vaadin-vertical-layout>
        `,
        root
      );
    }
  }
  render() {
    return html`
      <vaadin-grid .dataProvider="${this.dataProvider}" .expandedItems="${this.expandedItems}">
        <vaadin-grid-column
          auto-width
          header="Employee"
          .renderer="${this.employeeRenderer}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          auto-width
          header="Contact"
          .renderer="${this.contactRenderer}"
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
  // end::snippet[]
}
