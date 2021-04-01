import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty, html, css } from 'lit-element';
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

// tag::snippet[]
@customElement('grid-content')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  static get styles() {
    return css`
      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0.4em calc(0.5em + var(--lumo-border-radius-s) / 4);
        color: var(--lumo-primary-text-color);
        background-color: var(--lumo-primary-color-10pct);
        border-radius: var(--lumo-border-radius-s);
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-s);
        line-height: 1;
        font-weight: 500;
        text-transform: initial;
        letter-spacing: initial;
        min-width: calc(var(--lumo-line-height-xs) * 1em + 0.45em);
      }

      .success {
        color: var(--lumo-success-text-color);
        background-color: var(--lumo-success-color-10pct);
      }
    `;
  }

  render() {
    return html`
      <vaadin-grid .items=${this.items}>
        <vaadin-grid-selection-column></vaadin-grid-selection-column>
        <vaadin-grid-column
          header="Employee"
          .renderer=${this.empolyeeRenderer}
          flex-grow="0"
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column path="profession" resizable></vaadin-grid-column>
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
    render(html` <span class="badge success">Available</span> `, root);
  };

  private manageRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    render(
      html`
        <vaadin-button theme="tertiary">
          <iron-icon icon="vaadin:pencil"></iron-icon>
        </vaadin-button>
        <vaadin-button theme="error tertiary">
          <iron-icon icon="vaadin:trash"></iron-icon>
        </vaadin-button>
      `,
      root
    );
  };
}
// end::snippet[]
