import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-details/vaadin-details';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/sizing';
import '@vaadin/vaadin-lumo-styles/color';
import { getCountries } from 'Frontend/demo/domain/DataService';

import Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout/vaadin-form-layout';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('details-summary')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Country[] = [];

  @internalProperty()
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: '20em', columns: 2 },
  ];

  async firstUpdated() {
    this.items = await getCountries();
  }

  render() {
    return html`
      <vaadin-details opened>
        <vaadin-horizontal-layout
          slot="summary"
          style="justify-content: space-between; width: 100%;"
        >
          <span>Contact information</span>

          <vaadin-horizontal-layout
            style="color: var(--lumo-error-text-color); margin-left: var(--lumo-space-s)"
          >
            <iron-icon
              icon="vaadin:exclamation-circle"
              style="width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s);"
            ></iron-icon>
            <span>2 errors</span>
          </vaadin-horizontal-layout>
        </vaadin-horizontal-layout>

        <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
          <vaadin-text-field
            label="Address"
            value="4027 Amber Lake Canyon"
            colspan="2"
          ></vaadin-text-field>

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
      </vaadin-details>
    `;
  }
}
// end::snippet[]
