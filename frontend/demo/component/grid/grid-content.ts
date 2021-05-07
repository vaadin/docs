import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty, html } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-content')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private items?: Person[];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-selection-column></vaadin-grid-selection-column>
        <vaadin-grid-column
          header="Employee"
          .renderer="${this.empolyeeRenderer}"
          flex-grow="0"
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column path="profession" resizable auto-width></vaadin-grid-column>
        <vaadin-grid-column
          header="Status"
          .renderer="${this.statusRenderer}"
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column
          header="Manage"
          .renderer="${this.manageRenderer}"
          auto-width
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private empolyeeRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    const person = model.item as Person;
    render(
      html`
        <vaadin-horizontal-layout style="align-items: center;" theme="spacing">
          <vaadin-avatar
            img="${person.pictureUrl}"
            name="${person.firstName} ${person.lastName}"
            alt="User avatar"
          ></vaadin-avatar>
          <vaadin-vertical-layout style="line-height: var(--lumo-line-height-m);">
            <span> ${person.firstName} ${person.lastName} </span>
            <span
              style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);"
            >
              ${person.email}
            </span>
          </vaadin-vertical-layout>
        </vaadin-horizontal-layout>
      `,
      root
    );
  };

  private statusRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    const person = model.item as Person;
    render(
      html`
        <span theme="badge ${person.status === 'Available' ? 'success' : 'error'}"
          >${person.status}</span
        >
      `,
      root
    );
  };

  private manageRenderer = (root: HTMLElement) => {
    render(
      html`
        <vaadin-button theme="tertiary icon">
          <iron-icon icon="vaadin:pencil"></iron-icon>
        </vaadin-button>
        <vaadin-button theme="error tertiary icon">
          <iron-icon icon="vaadin:trash"></iron-icon>
        </vaadin-button>
      `,
      root
    );
  };
  // end::snippet[]
}
