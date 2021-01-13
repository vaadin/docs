import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-accordion/vaadin-accordion';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import { applyTheme } from 'themes/theme-generated.js';

// tag::snippet[]
@customElement('accordion-best-practices')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-accordion>
        <vaadin-accordion-panel>
          <div slot="summary">Personal Information</div>

          <vaadin-vertical-layout theme="padding spacing">
            <vaadin-text-field label="Name"></vaadin-text-field>
            <vaadin-text-field label="Phone"></vaadin-text-field>
            <vaadin-text-field label="Email"></vaadin-text-field>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel>
          <div slot="summary">Billing Address</div>

          <vaadin-vertical-layout theme="padding spacing">
            <vaadin-text-field label="Address"></vaadin-text-field>
            <vaadin-text-field label="City"></vaadin-text-field>
            <vaadin-text-field label="State"></vaadin-text-field>
            <vaadin-text-field label="Zip Code"></vaadin-text-field>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel disabled>
          <div slot="summary">Payment</div>

          <span>Not yet implemented</span>
        </vaadin-accordion-panel>
      </vaadin-accordion>
    `;
  }
}
// end::snippet[]
