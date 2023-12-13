import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/accordion';
import '@vaadin/button';
import '@vaadin/combo-box';
import '@vaadin/email-field';
import '@vaadin/form-layout';
import '@vaadin/horizontal-layout';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';
import type { AccordionOpenedChangedEvent } from '@vaadin/accordion';
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { getCountries } from 'Frontend/demo/domain/DataService';
import { Binder, field } from '@hilla/form';
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

  private readonly personBinder = new Binder(this, PersonModel);

  private readonly cardBinder = new Binder(this, CardModel);

  @state()
  private openedPanelIndex: number | null = 0;

  protected override async firstUpdated() {
    this.countries = await getCountries();
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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
            <vaadin-horizontal-layout style="width: 100%; align-items: center">
              Customer details
              <vaadin-vertical-layout
                .hidden="${this.openedPanelIndex === 0}"
                style="font-size: var(--lumo-font-size-s); margin-left: auto"
              >
                <span>
                  ${this.personBinder.value.firstName} ${this.personBinder.value.lastName}
                </span>
                <span>${this.personBinder.value.email}</span>
                <span>${this.personBinder.value.address?.phone}</span>
              </vaadin-vertical-layout>
            </vaadin-horizontal-layout>
          </vaadin-accordion-heading>
          <!-- end::snippet[] -->

          <vaadin-form-layout .responsiveSteps="${responsiveSteps}">
            <vaadin-text-field
              label="First name"
              ${field(this.personBinder.model.firstName)}
            ></vaadin-text-field>
            <vaadin-text-field
              label="Last name"
              ${field(this.personBinder.model.lastName)}
            ></vaadin-text-field>
            <vaadin-email-field
              label="Email address"
              ${field(this.personBinder.model.email)}
              colspan="2"
            ></vaadin-email-field>
            <vaadin-text-field
              label="Phone number"
              ${field(this.personBinder.model.address.phone)}
              colspan="2"
            ></vaadin-text-field>
          </vaadin-form-layout>
          <vaadin-button
            theme="primary"
            @click="${() => {
              this.openedPanelIndex = 1;
            }}"
          >
            Continue
          </vaadin-button>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel>
          <vaadin-accordion-heading slot="summary">
            <vaadin-horizontal-layout style="width: 100%; align-items: center">
              Billing address
              <vaadin-vertical-layout
                .hidden="${this.openedPanelIndex === 1}"
                style="font-size: var(--lumo-font-size-s); margin-left: auto"
              >
                <span>${this.personBinder.value.address?.street}</span>
                <span>
                  ${this.personBinder.value.address?.zip} ${this.personBinder.value.address?.city}
                </span>

                <span>
                  ${
                    // @ts-expect-error Workaround a Binder issue
                    this.personBinder.value.address?.country?.name
                  }
                </span>
              </vaadin-vertical-layout>
            </vaadin-horizontal-layout>
          </vaadin-accordion-heading>

          <vaadin-form-layout .responsiveSteps="${responsiveSteps}">
            <vaadin-text-field
              label="Address"
              ${field(this.personBinder.model.address.street)}
              colspan="2"
            ></vaadin-text-field>
            <vaadin-text-field
              label="ZIP code"
              ${field(this.personBinder.model.address.zip)}
            ></vaadin-text-field>
            <vaadin-text-field
              label="City"
              ${field(this.personBinder.model.address.city)}
            ></vaadin-text-field>
            <vaadin-combo-box
              label="Country"
              ${field(this.personBinder.model.address.country)}
              item-label-path="name"
              item-value-path="id"
              .items="${this.countries}"
            ></vaadin-combo-box>
          </vaadin-form-layout>
          <vaadin-button
            theme="primary"
            @click="${() => {
              this.openedPanelIndex = 2;
            }}"
          >
            Continue
          </vaadin-button>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel>
          <vaadin-accordion-heading slot="summary">
            <vaadin-horizontal-layout style="width: 100%; align-items: center">
              Payment
              <vaadin-vertical-layout
                .hidden="${this.openedPanelIndex === 2}"
                style="font-size: var(--lumo-font-size-s); margin-left: auto"
              >
                <span>${this.cardBinder.value.accountNumber}</span>
                <span>${this.cardBinder.value.expiryDate}</span>
              </vaadin-vertical-layout>
            </vaadin-horizontal-layout>
          </vaadin-accordion-heading>

          <vaadin-form-layout .responsiveSteps="${responsiveSteps}">
            <vaadin-text-field
              label="Card number"
              ${field(this.cardBinder.model.accountNumber)}
              colspan="2"
            ></vaadin-text-field>
            <vaadin-text-field
              label="Expiry date"
              ${field(this.cardBinder.model.expiryDate)}
            ></vaadin-text-field>
            <vaadin-text-field label="CVV" ${field(this.cardBinder.model.cvv)}></vaadin-text-field>
          </vaadin-form-layout>
          <vaadin-button
            theme="primary"
            @click="${() => {
              this.openedPanelIndex = -1;
            }}"
          >
            Finish
          </vaadin-button>
          <!-- tag::snippet[] -->
        </vaadin-accordion-panel>
      </vaadin-accordion>
      <!-- end::snippet[] -->
    `;
  }
}
