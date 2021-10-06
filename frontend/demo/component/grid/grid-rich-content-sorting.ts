import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sorter';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import type { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { differenceInYears, format, parseISO } from 'date-fns';

@customElement('grid-rich-content-sorting')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-sort-column
          header="Employee"
          path="lastName"
          .renderer="${this.employeeRenderer}"
        ></vaadin-grid-sort-column>
        <vaadin-grid-column
          .renderer="${this.birthdayRenderer}"
          .headerRenderer="${this.birthdayHeaderRenderer}"
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

  private birthdayHeaderRenderer = (root: HTMLElement) => {
    render(html`<vaadin-grid-sorter path="birthday">Birthdate</vaadin-grid-sorter>`, root);
  };

  private birthdayRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<Person>) => {
    const person = model.item;
    const birthday = parseISO(person.birthday);
    render(
      html`
        <vaadin-vertical-layout style="line-height: var(--lumo-line-height-m);">
          <span> ${format(birthday, 'P')} </span>
          <span
            style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);"
          >
            Age: ${differenceInYears(Date.now(), birthday)}
          </span>
        </vaadin-vertical-layout>
      `,
      root
    );
  };
  // end::snippet[]
}
