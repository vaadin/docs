import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-accordion/vaadin-accordion';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-button/vaadin-button';
import { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout';
import Country from '../../../generated/com/vaadin/demo/domain/Country';
import { getCountries } from '../../domain/DataService';
import { AccordionPanelElement } from '@vaadin/vaadin-accordion/src/vaadin-accordion-panel';

// tag::snippet[]

@customElement('accordion-summary')
export class Example extends LitElement {
  @internalProperty()
  private items: Country[] = [];
  @internalProperty()
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: '20em', columns: 2 }
  ];

  @internalProperty()
  private person = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };
  async firstUpdated() {
    this.items = await getCountries();
  }

  openChanged(e: CustomEvent) {
    const isOpened = e.detail.value;
    const summaryDetails = (e.currentTarget as HTMLElement).querySelector(
      '[slot=summary] vaadin-vertical-layout'
    );
    if (!summaryDetails) {
      return;
    }
    if (isOpened) {
      summaryDetails.setAttribute('hidden', '');
    } else {
      summaryDetails.removeAttribute('hidden');
    }
  }

  fieldChanged(e: CustomEvent) {
    const { name, value }: any = e.target;
    if (name === 'country') {
      this.person = { ...this.person, [name]: this.items.find(c => c.id === value)?.name };
    } else if (name) {
      this.person = { ...this.person, [name]: value };
    }
  }

  openNextPanel(e: CustomEvent) {
    const parent: HTMLElement | null = (e.target as Element).parentElement;
    if (!parent) {
      return;
    }
    if (parent.nextElementSibling instanceof AccordionPanelElement) {
      parent.nextElementSibling.opened = true;
    } else if (parent instanceof AccordionPanelElement) {
      parent.opened = false;
    }
  }
  render() {
    return html`
      <vaadin-accordion>
        <vaadin-accordion-panel @opened-changed="${this.openChanged}">
          <div slot="summary">
            Customer details
            <vaadin-vertical-layout style="font-size: var(--lumo-font-size-s)">
              <span>${this.person.firstName} ${this.person.lastName}</span>
              <span>${this.person.email}</span>
              <span>${this.person.phone}</span>
            </vaadin-vertical-layout>
          </div>

          <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
            <vaadin-text-field
              label="First Name"
              name="firstName"
              @change=${this.fieldChanged}
              required
            ></vaadin-text-field>
            <vaadin-text-field
              label="Last name"
              name="lastName"
              @change=${this.fieldChanged}
              required
            ></vaadin-text-field>
            <vaadin-text-field
              label="Email address"
              name="email"
              @change=${this.fieldChanged}
              colspan="2"
              required
            ></vaadin-text-field>
            <vaadin-text-field
              label="Phone number"
              name="phone"
              @change=${this.fieldChanged}
              colspan="2"
              required
            ></vaadin-text-field>
          </vaadin-form-layout>
          <vaadin-button theme="primary" @click=${this.openNextPanel}>
            Continue
          </vaadin-button>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel @opened-changed="${this.openChanged}">
          <div slot="summary">
            Billing Address
            <vaadin-vertical-layout style="font-size: var(--lumo-font-size-s)">
              <span>${this.person.address}</span>
              <span>${this.person.zipCode} ${this.person.city}</span>
              <span>${this.person.country}</span>
            </vaadin-vertical-layout>
          </div>

          <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
            <vaadin-text-field
              label="Address"
              name="address"
              @change=${this.fieldChanged}
              colspan="2"
              required
            ></vaadin-text-field>
            <vaadin-text-field
              label="ZIP code"
              name="zipCode"
              @change=${this.fieldChanged}
              required
            ></vaadin-text-field>
            <vaadin-text-field
              label="City"
              name="city"
              @change=${this.fieldChanged}
              required
            ></vaadin-text-field>
            <vaadin-combo-box
              label="Country"
              name="country"
              @change=${this.fieldChanged}
              item-label-path="name"
              item-value-path="id"
              .items="${this.items}"
            >
            </vaadin-combo-box>
          </vaadin-form-layout>
          <vaadin-button theme="primary" @click=${this.openNextPanel}>
            Continue
          </vaadin-button>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel @opened-changed="${this.openChanged}">
          <div slot="summary">
            Payment
            <vaadin-vertical-layout style="font-size: var(--lumo-font-size-s)">
              <span>${this.person.cardNumber}</span>
            </vaadin-vertical-layout>
          </div>

          <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
            <vaadin-text-field
              label="Card number"
              name="cardNumber"
              @change=${this.fieldChanged}
              colspan="2"
              required
            ></vaadin-text-field>
            <vaadin-text-field
              label="Expiry date"
              name="expiryDate"
              @change=${this.fieldChanged}
              required
            ></vaadin-text-field>
            <vaadin-text-field
              label="CVV"
              name="cvv"
              @change=${this.fieldChanged}
              required
            ></vaadin-text-field>
          </vaadin-form-layout>
          <vaadin-button theme="primary" @click=${this.openNextPanel}>
            Finish
          </vaadin-button>
        </vaadin-accordion-panel>
      </vaadin-accordion>
    `;
  }
}
// end::snippet[]
