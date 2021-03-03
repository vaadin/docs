import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement } from 'lit-element';
import { html, render } from 'lit-html';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-tree-toggle';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
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

@customElement('treegrid-rich-content')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  async dataProvider(params: GridDataProviderParams, callback: GridDataProviderCallback) {
    let people: Person[];

    if (params.parentItem) {
      const manager = params.parentItem as Person;
      people = await getPeople({ managerId: manager.id });
    } else {
      people = (await getPeople({ managerId: null })).map(person => ({
        ...person,
        hasChildren: true
      }));
    }

    const startIndex = params.page * params.pageSize;
    const pageItems = people.slice(startIndex, startIndex + params.pageSize);
    // Inform grid of the requested tree level's full size
    const treeLevelSize = people.length;
    callback(pageItems, treeLevelSize);
  }

  treeColumnRenderer(root: HTMLElement, _column?: GridColumnElement, model?: GridItemModel) {
    if (model?.item) {
      const person = model.item as Person;
      render(
        html`
          <vaadin-horizontal-layout>
            <vaadin-grid-tree-toggle
              .leaf=${person.managerId !== undefined}
              .expanded=${model.expanded!}
              .level=${model.level!}
              @expanded-changed=${(e: GridTreeToggleExpandedChanged) => {
                console.log(
                  'manager:',
                  `${person.firstName} ${person.lastName}`,
                  e.detail.value,
                  root.getAttribute('slot')
                );
                _column?._grid![e.detail.value ? 'expandItem' : 'collapseItem'](person);
              }}
            ></vaadin-grid-tree-toggle>
            <img .src=${person.pictureUrl} style="height: 48px; width: 48px;" />
            <div style="display: flex; flex-direction: column; justify-content: center;">
              <span>${person.firstName} ${person.lastName}</span>
              <span>${person.profession}</span>
            </div>
          </vaadin-horizontal-layout>
        `,
        root
      );
    }
  }

  // tag::snippet[]

  render() {
    return html`
      <vaadin-grid .dataProvider=${this.dataProvider.bind(this)}>
        <vaadin-grid-column
          auto-width
          header="Employee"
          .renderer=${this.treeColumnRenderer}
        ></vaadin-grid-column>
        <vaadin-grid-column auto-width path="email"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
  // end::snippet[]
}
