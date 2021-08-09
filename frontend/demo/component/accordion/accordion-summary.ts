import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-accordion/vaadin-accordion';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-button/vaadin-button';
import { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout';
import Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { getCountries } from 'Frontend/demo/domain/DataService';
import { Binder, field } from '@vaadin/form';
import PersonModel from 'Frontend/generated/com/vaadin/demo/domain/PersonModel';
import CardModel from 'Frontend/generated/com/vaadin/demo/domain/CardModel';
import { applyTheme } from 'Frontend/generated/theme';

const responsiveSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1 },
  { minWidth: '20em', columns: 2 },
];

@customElement('accordion-summary')
export class Example extends LitElement {
  @state()
  private countries: Country[] = [];

  @state()
  private personBinder = new Binder(this, PersonModel);

  @state()
  private cardBinder = new Binder(this, CardModel);

  @state()
  private openedPanelIndex = 0;
  async firstUpdated() {
    this.countries = await getCountries();
  }
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-accordion
        .opened="${this.openedPanelIndex}"
        @opened-changed="${(e: CustomEvent) => (this.openedPanelIndex = e.detail.value)}"
      >
        <vaadin-accordion-panel>
          <div slot="summary">
            Customer details
            <vaadin-vertical-layout
              .hidden="${this.openedPanelIndex === 0}"
              style="font-size: var(--lumo-font-size-s)"
            >
              <span>${this.personBinder.value.firstName} ${this.personBinder.value.lastName}</span>
              <span>${this.personBinder.value.email}</span>
              <span>${this.personBinder.value.address?.phone}</span>
            </vaadin-vertical-layout>
          </div>
          <!-- end::snippet[] -->

          <vaadin-form-layout .responsiveSteps="${responsiveSteps}">
            <vaadin-text-field
              label="First name"
              ...="${field(this.personBinder.model.firstName)}"
            ></vaadin-text-field>
            <vaadin-text-field
              label="Last name"
              ...="${field(this.personBinder.model.lastName)}"
            ></vaadin-text-field>
            <vaadin-email-field
              label="Email address"
              ...="${field(this.personBinder.model.email)}"
              colspan="2"
            ></vaadin-email-field>
            <vaadin-text-field
              label="Phone number"
              ...="${field(this.personBinder.model.address.phone)}"
              colspan="2"
            ></vaadin-text-field>
          </vaadin-form-layout>
          <vaadin-button theme="primary" @click="${() => (this.openedPanelIndex = 1)}">
            Continue
          </vaadin-button>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel>
          <div slot="summary">
            Billing address
            <vaadin-vertical-layout
              .hidden="${this.openedPanelIndex === 1}"
              style="font-size: var(--lumo-font-size-s)"
            >
              <span>${this.personBinder.value.address?.street}</span>
              <span
                >${this.personBinder.value.address?.zip}
                ${this.personBinder.value.address?.city}</span
              >

              <span
                >${
                  // @ts-ignore Workaround a Binder issue
                  this.personBinder.value.address?.country?.name
                }</span
              >
            </vaadin-vertical-layout>
          </div>

          <vaadin-form-layout .responsiveSteps="${responsiveSteps}">
            <vaadin-text-field
              label="Address"
              ...="${field(this.personBinder.model.address.street)}"
              colspan="2"
            ></vaadin-text-field>
            <vaadin-text-field
              label="ZIP code"
              ...="${field(this.personBinder.model.address.zip)}"
            ></vaadin-text-field>
            <vaadin-text-field
              label="City"
              ...="${field(this.personBinder.model.address.city)}"
            ></vaadin-text-field>
            <vaadin-combo-box
              label="Country"
              ...="${field(this.personBinder.model.address.country)}"
              item-label-path="name"
              item-value-path="id"
              .items="${this.countries}"
            >
            </vaadin-combo-box>
          </vaadin-form-layout>
          <vaadin-button theme="primary" @click="${() => (this.openedPanelIndex = 2)}">
            Continue
          </vaadin-button>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel>
          <div slot="summary">
            Payment
            <vaadin-vertical-layout
              .hidden="${this.openedPanelIndex === 2}"
              style="font-size: var(--lumo-font-size-s)"
            >
              <span>${this.cardBinder.value.accountNumber}</span>
              <span>${this.cardBinder.value.expiryDate}</span>
            </vaadin-vertical-layout>
          </div>

          <vaadin-form-layout .responsiveSteps="${responsiveSteps}">
            <vaadin-text-field
              label="Card number"
              ...="${field(this.cardBinder.model.accountNumber)}"
              colspan="2"
            ></vaadin-text-field>
            <vaadin-text-field
              label="Expiry date"
              ...="${field(this.cardBinder.model.expiryDate)}"
            ></vaadin-text-field>
            <vaadin-text-field
              label="CVV"
              ...="${field(this.cardBinder.model.cvv)}"
            ></vaadin-text-field>
          </vaadin-form-layout>
          <vaadin-button theme="primary" @click="${() => (this.openedPanelIndex = -1)}">
            Finish
          </vaadin-button>
          <!-- tag::snippet[] -->
        </vaadin-accordion-panel>
      </vaadin-accordion>
      <!-- end::snippet[] -->
    `;
  }
}
