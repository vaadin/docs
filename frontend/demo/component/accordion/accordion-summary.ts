import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/accordion';
import '@vaadin/button';
import '@vaadin/combo-box';
import '@vaadin/email-field';
import '@vaadin/form-layout';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import { html, LitElement, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { AccordionOpenedChangedEvent } from '@vaadin/accordion';
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import { getCountries } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

const responsiveSteps: FormLayoutResponsiveStep[] = [
  { minWidth: 0, columns: 1 },
  { minWidth: '20em', columns: 2 },
];

@customElement('accordion-summary')
export class Example extends LitElement {
  @state()
  private countries: Country[] = [];

  @state()
  private openedPanelIndex: number | null = 0;

  @state()
  private customerComplete: boolean = false;

  @state()
  private billingComplete: boolean = false;

  @state()
  private paymentComplete: boolean = false;

  protected override async firstUpdated() {
    this.countries = await getCountries();
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-accordion
        .opened="${this.openedPanelIndex}"
        @opened-changed="${(event: AccordionOpenedChangedEvent) => {
          this.openedPanelIndex = event.detail.value;
        }}"
      >
        <vaadin-accordion-panel>
          <vaadin-accordion-heading slot="summary">
            <vaadin-horizontal-layout theme="spacing">
              Customer details
              ${this.customerComplete
                ? html`
                    <vaadin-icon
                      icon="vaadin:check"
                      style="color: var(--lumo-success-text-color); --vaadin-icon-size: 1rem"
                    ></vaadin-icon>
                  `
                : nothing}
            </vaadin-horizontal-layout>
          </vaadin-accordion-heading>
          <!-- end::snippet[] -->

          <vaadin-vertical-layout theme="spacing">
            <vaadin-form-layout .responsiveSteps="${responsiveSteps}">
              <vaadin-text-field label="First name"></vaadin-text-field>
              <vaadin-text-field label="Last name"></vaadin-text-field>
              <vaadin-email-field label="Email address" colspan="2"></vaadin-email-field>
              <vaadin-text-field label="Phone number" colspan="2"></vaadin-text-field>
            </vaadin-form-layout>
            <vaadin-button
              theme="primary"
              @click="${() => {
                this.openedPanelIndex = 1;
                this.customerComplete = true;
              }}"
            >
              Continue
            </vaadin-button>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel>
          <vaadin-accordion-heading slot="summary">
            <vaadin-horizontal-layout theme="spacing">
              Billing address
              ${this.billingComplete
                ? html`
                    <vaadin-icon
                      icon="vaadin:check"
                      style="color: var(--lumo-success-text-color); --vaadin-icon-size: 1rem"
                    ></vaadin-icon>
                  `
                : nothing}
            </vaadin-horizontal-layout>
          </vaadin-accordion-heading>

          <vaadin-vertical-layout theme="spacing">
            <vaadin-form-layout .responsiveSteps="${responsiveSteps}">
              <vaadin-text-field label="Address" colspan="2"></vaadin-text-field>
              <vaadin-text-field label="ZIP code"></vaadin-text-field>
              <vaadin-text-field label="City"></vaadin-text-field>
              <vaadin-combo-box
                label="Country"
                item-label-path="name"
                item-value-path="name"
                .items="${this.countries}"
              ></vaadin-combo-box>
            </vaadin-form-layout>
            <vaadin-button
              theme="primary"
              @click="${() => {
                this.openedPanelIndex = 2;
                this.billingComplete = true;
              }}"
            >
              Continue
            </vaadin-button>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel>
          <vaadin-accordion-heading slot="summary">
            <vaadin-horizontal-layout theme="spacing">
              Payment
              ${this.paymentComplete
                ? html`
                    <vaadin-icon
                      icon="vaadin:check"
                      style="color: var(--lumo-success-text-color); --vaadin-icon-size: 1rem"
                    ></vaadin-icon>
                  `
                : nothing}
            </vaadin-horizontal-layout>
          </vaadin-accordion-heading>

          <vaadin-vertical-layout theme="spacing">
            <vaadin-form-layout .responsiveSteps="${responsiveSteps}">
              <vaadin-text-field label="Card number" colspan="2"></vaadin-text-field>
              <vaadin-text-field label="Expiry date"></vaadin-text-field>
              <vaadin-text-field label="CVV"></vaadin-text-field>
            </vaadin-form-layout>
            <vaadin-button
              theme="primary"
              @click="${() => {
                this.openedPanelIndex = -1;
                this.paymentComplete = true;
              }}"
            >
              Finish
            </vaadin-button>
          </vaadin-vertical-layout>
          <!-- tag::snippet[] -->
        </vaadin-accordion-panel>
      </vaadin-accordion>
      <!-- end::snippet[] -->
    `;
  }
}
