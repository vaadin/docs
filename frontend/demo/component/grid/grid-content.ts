import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import type { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-content')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
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
          .renderer="${this.employeeRenderer}"
          flex-grow="0"
          auto-width
        ></vaadin-grid-column>
        <vaadin-grid-column path="profession" auto-width></vaadin-grid-column>
        <vaadin-grid-column
          header="Status"
          .renderer="${this.statusRenderer}"
          auto-width
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private employeeRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<Person>) => {
    const person = model.item;
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

  private statusRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<Person>) => {
    const person = model.item;
    render(
      html`
        <span theme="badge ${person.status === 'Available' ? 'success' : 'error'}"
          >${person.status}</span
        >
      `,
      root
    );
  };
  // end::snippet[]
}
