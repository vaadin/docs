import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/combo-box';
import '@vaadin/details';
import '@vaadin/form-layout';
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/text-field';
import '@vaadin/vaadin-lumo-styles/sizing';
import '@vaadin/vaadin-lumo-styles/color';
import { getCountries } from 'Frontend/demo/domain/DataService';
import type Country from 'Frontend/generated/com/vaadin/demo/domain/Country';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('details-summary')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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
    return html`
      <vaadin-details opened>
        <vaadin-details-summary slot="summary">
          <vaadin-horizontal-layout style="justify-content: space-between; width: 100%;">
            <span>Contact information</span>

            <vaadin-horizontal-layout
              style="color: var(--lumo-error-text-color); margin-left: var(--lumo-space-s)"
            >
              <vaadin-icon
                icon="vaadin:exclamation-circle"
                style="width: var(--lumo-icon-size-s); height: var(--lumo-icon-size-s); margin-right: var(--lumo-space-xs)"
              ></vaadin-icon>
              <span>2 errors</span>
            </vaadin-horizontal-layout>
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
  }
}
// end::snippet[]
