import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-accordion/vaadin-accordion';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import Country from '../../../generated/com/vaadin/demo/domain/Country';
import { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout/vaadin-form-layout';
import { getCountries } from '../../domain/DataService';
import { applyTheme } from 'themes/theme-generated.js';

// tag::snippet[]
@customElement('accordion-best-practices')
export class Example extends LitElement {
  @internalProperty()
  private items: Country[] = [];
  @internalProperty()
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: '20em', columns: 2 }
  ];

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
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-accordion>
        <vaadin-accordion-panel @opened-changed="${this.openChanged}">
          <div slot="summary">
            Customer details
            <vaadin-vertical-layout style="font-size: var(--lumo-font-size-s)">
              <span>Sophia Williams</span>
              <span>sophia.williams@company.com</span>
              <span>(501) 555-9128</span>
            </vaadin-vertical-layout>
          </div>

          <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
            <vaadin-text-field label="First Name" required></vaadin-text-field>
            <vaadin-text-field label="Last name" required></vaadin-text-field>
            <vaadin-text-field label="Email address" colspan="2" required></vaadin-text-field>
            <vaadin-text-field label="Phone number" colspan="2" required></vaadin-text-field>
          </vaadin-form-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel @opened-changed="${this.openChanged}">
          <div slot="summary">
            Billing Address
            <vaadin-vertical-layout style="font-size: var(--lumo-font-size-s)">
              <span>Sophia Williams</span>
              <span>sophia.williams@company.com</span>
              <span>(501) 555-9128</span>
            </vaadin-vertical-layout>
          </div>

          <vaadin-vertical-layout theme="padding spacing">
            <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
              <vaadin-text-field label="Address" colspan="2" required></vaadin-text-field>
              <vaadin-text-field label="ZIP code" required></vaadin-text-field>
              <vaadin-text-field label="City" required></vaadin-text-field>
              <vaadin-combo-box
                label="Country"
                item-label-path="name"
                item-value-path="id"
                .items="${this.items}"
              >
              </vaadin-combo-box>
            </vaadin-form-layout>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel @opened-changed="${this.openChanged}">
          <div slot="summary">
            Payment
            <vaadin-vertical-layout style="font-size: var(--lumo-font-size-s)">
              <span>Sophia Williams</span>
              <span>sophia.williams@company.com</span>
              <span>(501) 555-9128</span>
            </vaadin-vertical-layout>
          </div>

          <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
            <vaadin-text-field label="Card number" colspan="2" required></vaadin-text-field>
            <vaadin-text-field label="Expiry date" required></vaadin-text-field>
            <vaadin-text-field label="CVV" required></vaadin-text-field>
          </vaadin-form-layout>
        </vaadin-accordion-panel>
      </vaadin-accordion>
    `;
  }
}
// end::snippet[]
