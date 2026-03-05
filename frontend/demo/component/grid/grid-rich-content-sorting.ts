import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-sort-column.js';
import { differenceInYears, format, parseISO } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { columnBodyRenderer, columnHeaderRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('grid-rich-content-sorting')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
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
    <div class="person-item">
      <vaadin-avatar
        img="${person.pictureUrl}"
        name="${person.firstName} ${person.lastName}"
        style="--vaadin-avatar-size: 2.25rem"
      ></vaadin-avatar>
      <span>${person.firstName} ${person.lastName}</span>
      <span>${person.email}</span>
    </div>
  `;

  private birthdayHeaderRenderer = () => html`
    <vaadin-grid-sorter path="birthday">Birthdate</vaadin-grid-sorter>
  `;

  private birthdayRenderer: GridColumnBodyLitRenderer<Person> = (person) => {
    const birthday = parseISO(person.birthday);
    return html`
      <div>${format(birthday, 'P')}</div>
      <div style="font-size: .875rem; color: var(--vaadin-text-color-secondary);">
        Age: ${differenceInYears(Date.now(), birthday)}
      </div>
    `;
  };
  // end::snippet[]
}
