import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, query } from 'lit-element';
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
  GridElement,
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

  @query('vaadin-grid')
  private grid?: GridElement;

  async dataProvider(params: GridDataProviderParams, callback: GridDataProviderCallback) {
    let people: Person[];

    if (params.parentItem) {
      const manager = params.parentItem as Person;
      people = await getPeople({ managerId: manager.id });
    } else {
      people = await getPeople({ managerId: null });
    }

    const startIndex = params.page * params.pageSize;
    const pageItems = people.slice(startIndex, startIndex + params.pageSize);
    // Inform grid of the requested tree level's full size
    const treeLevelSize = people.length;
    callback(pageItems, treeLevelSize);
  }

  // tag::snippet[]
  employeeRenderer(root: HTMLElement, _column?: GridColumnElement, model?: GridItemModel) {
    const { grid } = this;

    if (model?.item) {
      const person = model.item as Person;

      render(
        html`
          <vaadin-horizontal-layout>
            <vaadin-grid-tree-toggle
              .leaf=${!person.hasChildren}
              .level=${model.level!}
              @expanded-changed=${(e: GridTreeToggleExpandedChanged) => {
                grid && grid[e.detail.value ? 'expandItem' : 'collapseItem'](person);
              }}
              .expanded=${model.expanded!}
            ></vaadin-grid-tree-toggle>
            <img
              .src=${person.pictureUrl}
              style="height: var(--lumo-size-m); width: var(--lumo-size-m); align-self: center;"
            />
            <vaadin-vertical-layout>
              <span>${person.firstName} ${person.lastName}</span>
              <span style="font-size: var(--lumo-font-size-s); color: var(--lumo-contrast-70pct);"
                >${person.profession}</span
              >
            </vaadin-vertical-layout>
          </vaadin-horizontal-layout>
        `,
        root
      );
    }
  }
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
      <vaadin-grid .dataProvider=${this.dataProvider}>
        <vaadin-grid-column
          auto-width
          header="Employee"
          .renderer=${this.employeeRenderer.bind(this)}
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
