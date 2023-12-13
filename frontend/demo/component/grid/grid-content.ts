import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import '@vaadin/horizontal-layout';
import '@vaadin/vertical-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-content')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: Person[] | undefined;

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-selection-column></vaadin-grid-selection-column>
        <vaadin-grid-column
          header="Employee"
          flex-grow="0"
          auto-width
          ${columnBodyRenderer(this.employeeRenderer, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column path="profession" auto-width></vaadin-grid-column>
        <vaadin-grid-column
          header="Status"
          auto-width
          ${columnBodyRenderer(this.statusRenderer, [])}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private employeeRenderer: GridColumnBodyLitRenderer<Person> = (person) => html`
    <vaadin-horizontal-layout style="align-items: center;" theme="spacing">
      <vaadin-avatar
        img="${person.pictureUrl}"
        name="${person.firstName} ${person.lastName}"
        alt="User avatar"
      ></vaadin-avatar>
      <vaadin-vertical-layout style="line-height: var(--lumo-line-height-m);">
        <span>${person.firstName} ${person.lastName}</span>
        <span style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);">
          ${person.email}
        </span>
      </vaadin-vertical-layout>
    </vaadin-horizontal-layout>
  `;

  private statusRenderer: GridColumnBodyLitRenderer<Person> = ({ status }) => html`
    <span theme="badge ${status === 'Available' ? 'success' : 'error'}">${status}</span>
  `;
  // end::snippet[]
}
