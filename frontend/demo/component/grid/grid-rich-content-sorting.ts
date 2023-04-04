import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-sorter.js';
import { columnBodyRenderer, columnHeaderRenderer } from '@vaadin/grid/lit.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import '@vaadin/horizontal-layout';
import '@vaadin/vertical-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { differenceInYears, format, parseISO } from 'date-fns';

@customElement('grid-rich-content-sorting')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-sort-column
          header="Employee"
          path="lastName"
          ${columnBodyRenderer(this.employeeRenderer, [])}
        ></vaadin-grid-sort-column>
        <vaadin-grid-column
          ${columnHeaderRenderer(this.birthdayHeaderRenderer, [])}
          ${columnBodyRenderer(this.birthdayRenderer, [])}
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

  private birthdayHeaderRenderer = () => html`
    <vaadin-grid-sorter path="birthday">Birthdate</vaadin-grid-sorter>
  `;

  private birthdayRenderer: GridColumnBodyLitRenderer<Person> = (person) => {
    const birthday = parseISO(person.birthday);
    return html`
      <vaadin-vertical-layout style="line-height: var(--lumo-line-height-m);">
        <span> ${format(birthday, 'P')} </span>
        <span style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);">
          Age: ${differenceInYears(Date.now(), birthday)}
        </span>
      </vaadin-vertical-layout>
    `;
  };
  // end::snippet[]
}
