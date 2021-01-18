import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-accordion/vaadin-accordion';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';

// tag::snippet[]
@customElement('accordion-reverse-panels')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-accordion>
        <vaadin-accordion-panel theme="reverse">
          <div slot="summary">Personal Information</div>

          <vaadin-vertical-layout>
            <span>Sophia Williams</span>
            <span>sophia.williams@company.com</span>
            <span>(501) 555-9128</span>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel theme="reverse">
          <div slot="summary">Billing Address</div>

          <vaadin-vertical-layout>
            <span>4027 Amber Lake Canyon</span>
            <span>72333-5884 Cozy Nook</span>
            <span>Arkansas</span>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel theme="reverse">
          <div slot="summary">Payment</div>

          <vaadin-vertical-layout>
            <span>MasterCard</span>
            <span>1234 5678 9012 3456</span>
            <span>Expires 06/21</span>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>
      </vaadin-accordion>
    `;
  }
}
// end::snippet[]
