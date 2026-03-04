import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/badge';
import '@vaadin/combo-box';
import '@vaadin/details';
import '@vaadin/form-layout';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import { getCountries } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';

@customElement('details-summary')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items: Country[] = [];

  @state()
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: '20em', columns: 2 },
  ];

  protected override async firstUpdated() {
    this.items = await getCountries();
  }

  protected override render() {
    // tag::snippet[]
    return html`
      <vaadin-details opened>
        <vaadin-details-summary slot="summary">
          <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
            <span>Contact information</span>

            <vaadin-badge theme="error" number="2">
              <vaadin-icon slot="icon" icon="vaadin:exclamation-circle"></vaadin-icon>
              <span>errors</span>
            </vaadin-badge>
          </vaadin-horizontal-layout>
        </vaadin-details-summary>

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
          ></vaadin-combo-box>
        </vaadin-form-layout>
      </vaadin-details>
    `;
    // end::snippet[]
  }
}
