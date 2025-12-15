import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/form-layout';
import '@vaadin/grid';
import '@vaadin/icon';
import '@vaadin/text-field';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { columnBodyRenderer, gridRowDetailsRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
@customElement('grid-item-details-toggle')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  @state()
  private detailsOpenedItems: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
  }

  protected override render() {
    return html`
      <vaadin-grid
        theme="row-stripes"
        .items="${this.items}"
        .detailsOpenedItems="${this.detailsOpenedItems}"
        ${gridRowDetailsRenderer<Person>(
          (person) => html`
            <vaadin-form-layout .responsiveSteps="${[{ minWidth: '0', columns: 3 }]}">
              <vaadin-text-field
                label="Email address"
                .value="${person.email}"
                colspan="3"
                readonly
              ></vaadin-text-field>
              <vaadin-text-field
                label="Phone number"
                .value="${person.address.phone}"
                colspan="3"
                readonly
              ></vaadin-text-field>
              <vaadin-text-field
                label="Street address"
                .value="${person.address.street}"
                colspan="3"
                readonly
              ></vaadin-text-field>
              <vaadin-text-field
                label="ZIP code"
                .value="${person.address.zip}"
                readonly
              ></vaadin-text-field>
              <vaadin-text-field
                label="City"
                .value="${person.address.city}"
                readonly
              ></vaadin-text-field>
              <vaadin-text-field
                label="State"
                .value="${person.address.state}"
                readonly
              ></vaadin-text-field>
            </vaadin-form-layout>
          `,
          []
        )}
      >
        <vaadin-grid-column
          width="80px"
          flex-grow="0"
          frozen
          ${columnBodyRenderer<Person>(
            (person, { detailsOpened }) => html`
              <vaadin-button
                theme="tertiary icon"
                aria-label="Toggle details"
                aria-expanded="${detailsOpened ? 'true' : 'false'}"
                @click="${() => {
                  this.detailsOpenedItems = detailsOpened
                    ? this.detailsOpenedItems.filter((p) => p !== person)
                    : [...this.detailsOpenedItems, person];
                }}"
              >
                <vaadin-icon
                  .icon="${detailsOpened ? 'lumo:angle-down' : 'lumo:angle-right'}"
                ></vaadin-icon>
              </vaadin-button>
            `,
            []
          )}
        ></vaadin-grid-column>
        <vaadin-grid-column path="displayName" header="Name"></vaadin-grid-column>
        <vaadin-grid-column path="profession"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}

// end::snippet[]
