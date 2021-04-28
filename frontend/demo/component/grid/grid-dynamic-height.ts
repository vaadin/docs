import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty, html, query } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { ComboBoxElement } from '@vaadin/vaadin-combo-box/vaadin-combo-box';

// tag::snippet[]
@customElement('grid-dynamic-height')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  @internalProperty()
  private invitedPeople: Person[] = [];

  @query('vaadin-combo-box')
  private comboBox!: ComboBoxElement;

  async firstUpdated() {
    const people = await (await getPeople()).people.map((person) => {
      return {
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      };
    });
    this.items = people;
  }

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <vaadin-combo-box
          .items="${this.items}"
          item-label-path="displayName"
          item-value-path="id"
          style="flex: 1;"
        ></vaadin-combo-box>
        <vaadin-button
          theme="primary"
          @click="${() => {
            const value = this.comboBox.value;
            const person = this.items.find((p) => +p.id === +value);

            if (person && !this.invitedPeople.includes(person)) {
              this.invitedPeople = [...this.invitedPeople, person];
              this.comboBox.value = '';
            }
          }}"
          >Send invite</vaadin-button
        >
      </vaadin-horizontal-layout>
      ${this.invitedPeople.length === 0
        ? html`<div
            style="padding: var(--lumo-size-l);text-align: center;font-style: italic; color: var(--lumo-contrast-70pct);"
          >
            No invitation has been sent
          </div>`
        : html`<vaadin-grid .items="${this.invitedPeople}" height-by-rows>
            <vaadin-grid-column
              header="Name"
              .renderer="${this.nameRenderer}"
              auto-width
            ></vaadin-grid-column>
            <vaadin-grid-column path="email"></vaadin-grid-column>
            <vaadin-grid-column path="address.phone"></vaadin-grid-column>
            <vaadin-grid-column
              header="Manage"
              .renderer="${this.manageRenderer}"
            ></vaadin-grid-column>
          </vaadin-grid>`}
    `;
  }

  private nameRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    const { firstName, lastName } = model.item as Person;
    render(html` <span>${firstName} ${lastName}</span> `, root);
  };

  private manageRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    const { id } = model.item as Person;
    render(
      html`
        <vaadin-button
          theme="error tertiary"
          @click="${() => (this.invitedPeople = this.invitedPeople.filter((p) => p.id !== id))}"
          ><iron-icon icon="vaadin:trash"></iron-icon
        ></vaadin-button>
      `,
      root
    );
  };
}
// end::snippet[]
