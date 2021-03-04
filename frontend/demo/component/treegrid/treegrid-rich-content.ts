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

@customElement('treegrid-rich-content')
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
    let treeToggle, nameSpan, professionSpan;
    const { grid } = this;

    if (root.firstElementChild) {
      treeToggle = root.querySelector('vaadin-grid-tree-toggle')!;
      [nameSpan, professionSpan] = root.querySelectorAll('span');
    } else {
      const container = document.createElement('vaadin-horizontal-layout');

      treeToggle = document.createElement('vaadin-grid-tree-toggle');
      treeToggle.addEventListener('expanded-changed', (e: GridTreeToggleExpandedChanged) => {
        grid && grid[e.detail.value ? 'expandItem' : 'collapseItem']((e.target as any).item);
      });
      container.append(treeToggle);

      const detailContainer = document.createElement('vaadin-vertical-layout');
      container.append(detailContainer);

      nameSpan = document.createElement('span');
      detailContainer.append(nameSpan);

      professionSpan = document.createElement('span');
      professionSpan.style.fontSize = 'var(--lumo-font-size-s)';
      professionSpan.style.color = 'var(--lumo-contrast-70pct)';
      detailContainer.append(professionSpan);

      root.append(container);
    }

    if (model?.item) {
      const person = model.item as Person;

      (treeToggle as any).item = person;
      treeToggle.leaf = person.managerId !== undefined;
      treeToggle.level = model.level!;
      treeToggle.expanded = model.expanded!;

      nameSpan.textContent = `${person.firstName} ${person.lastName}`;
      professionSpan.textContent = person.profession;
    }
  }
  contactRenderer(root: HTMLElement, _column?: GridColumnElement, model?: GridItemModel) {
    let emailSpan, phoneSpan;
    if (root.firstElementChild) {
      [emailSpan, phoneSpan] = root.querySelectorAll('span');
    } else {
      const container = document.createElement('vaadin-vertical-layout');
      container.style.color = 'var(--lumo-primary-color)';
      container.style.fontSize = 'var(--lumo-font-size-s)';
      root.append(container);

      const emailContainer = document.createElement('div');
      container.append(emailContainer);

      const emailIcon = document.createElement('iron-icon');
      emailIcon.icon = 'vaadin:envelope';
      emailIcon.style.height = 'var(--lumo-font-size-m)';
      emailContainer.append(emailIcon);

      emailSpan = document.createElement('span');
      emailContainer.append(emailSpan);

      const phoneContainer = document.createElement('div');
      container.append(phoneContainer);

      const phoneIcon = document.createElement('iron-icon');
      phoneIcon.icon = 'vaadin:phone';
      phoneIcon.style.height = 'var(--lumo-font-size-m)';
      phoneContainer.append(phoneIcon);

      phoneSpan = document.createElement('span');
      phoneContainer.append(phoneSpan);
    }

    if (model?.item) {
      const person = model.item as Person;

      emailSpan.textContent = person.email;
      phoneSpan.textContent = person.address.phone;
    }
  }
  render() {
    return html`
      <vaadin-grid .dataProvider=${this.dataProvider.bind(this)}>
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
