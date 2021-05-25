import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import type { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-dynamic-height')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
  private invitedPeople: Person[] = [];

  @state()
  private selectedItem = '';

  async firstUpdated() {
    const people = (await getPeople()).people.map((person) => {
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
          .value="${this.selectedItem}"
          @value-changed=${(e: CustomEvent) => (this.selectedItem = e.detail.value)}
          item-label-path="displayName"
          item-value-path="id"
          style="flex: 1;"
        ></vaadin-combo-box>
        <vaadin-button
          theme="primary"
          @click="${() => {
            const value = this.selectedItem;
            const personIdx = this.items.findIndex((p) => +p.id === +value);
            if (personIdx >= 0) {
              const person = this.items.splice(personIdx, 1)[0];
              this.items = [...this.items]; // re-assign the array to refresh the combo-box
              this.invitedPeople = [...this.invitedPeople, person];
              this.selectedItem = '';
            }
          }}"
          >Send invite</vaadin-button
        >
      </vaadin-horizontal-layout>

      ${this.invitedPeople.length === 0
        ? this.renderNoInvitationAlert()
        : this.renderInvitedPeopleTable()}
    `;
  }

  private manageRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<Person>) => {
    const { id } = model.item;
    render(
      html`
        <vaadin-button
          theme="error tertiary icon"
          @click="${() => {
            this.invitedPeople = this.invitedPeople.filter((p) => p.id !== id);
            this.items.unshift(model.item as Person);
            this.items = [...this.items]; // re-assign the array to refresh the combo-box
          }}"
          ><iron-icon icon="vaadin:trash"></iron-icon
        ></vaadin-button>
      `,
      root
    );
  };

  private renderNoInvitationAlert = () => {
    return html`
      <div
        style="padding: var(--lumo-size-l);text-align: center;font-style: italic; color: var(--lumo-contrast-70pct);"
      >
        No invitation has been sent
      </div>
    `;
  };

  private renderInvitedPeopleTable = () => {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid .items="${this.invitedPeople}" height-by-rows>
        <vaadin-grid-column header="Name" path="displayName" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
        <vaadin-grid-column path="address.phone"></vaadin-grid-column>
        <vaadin-grid-column header="Manage" .renderer="${this.manageRenderer}"></vaadin-grid-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  };
}
