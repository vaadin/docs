import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/combo-box';
import type { ComboBoxValueChangedEvent } from '@vaadin/combo-box';
import '@vaadin/grid';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-dynamic-height')
export class Example extends LitElement {
  protected override createRenderRoot() {
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
  private selectedValue = '';

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <vaadin-combo-box
          .items="${this.items}"
          .value="${this.selectedValue}"
          item-label-path="displayName"
          item-value-path="id"
          style="flex: 1;"
          @value-changed="${(event: ComboBoxValueChangedEvent) => {
            this.selectedValue = event.detail.value;
          }}"
        ></vaadin-combo-box>
        <vaadin-button
          theme="primary"
          @click="${() => {
            const person = this.items.find((p) => String(p.id) === this.selectedValue);
            const isInvited = person && this.invitedPeople.some((p) => p.id === person.id);
            if (person && !isInvited) {
              this.invitedPeople = [...this.invitedPeople, person];
              this.selectedValue = '';
            }
          }}"
        >
          Send invite
        </vaadin-button>
      </vaadin-horizontal-layout>

      ${this.invitedPeople.length === 0
        ? this.renderNoInvitationAlert()
        : this.renderInvitedPeopleTable()}
    `;
  }

  private manageRenderer: GridColumnBodyLitRenderer<Person> = ({ id }) => html`
    <vaadin-button
      theme="error tertiary icon"
      @click="${() => {
        this.invitedPeople = this.invitedPeople.filter((p) => p.id !== id);
      }}"
    >
      <vaadin-icon icon="vaadin:trash"></vaadin-icon>
    </vaadin-button>
  `;

  private renderNoInvitationAlert = () => html`
    <div
      style="padding: var(--lumo-size-l);text-align: center;font-style: italic; color: var(--lumo-contrast-70pct);"
    >
      No invitation has been sent
    </div>
  `;

  private renderInvitedPeopleTable = () => html`
    <!-- tag::snippet[] -->
    <vaadin-grid .items="${this.invitedPeople}" all-rows-visible>
      <vaadin-grid-column header="Name" path="displayName" auto-width></vaadin-grid-column>
      <vaadin-grid-column path="email"></vaadin-grid-column>
      <vaadin-grid-column path="address.phone"></vaadin-grid-column>
      <vaadin-grid-column
        header="Manage"
        ${columnBodyRenderer(this.manageRenderer, [])}
      ></vaadin-grid-column>
    </vaadin-grid>
    <!-- end::snippet[] -->
  `;
}
