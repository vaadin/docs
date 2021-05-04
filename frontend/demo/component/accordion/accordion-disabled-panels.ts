import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-accordion/vaadin-accordion';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('accordion-disabled-panels')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-accordion>
        <!-- end::snippet[] -->
        <vaadin-accordion-panel>
          <div slot="summary">Personal information</div>

          <vaadin-vertical-layout>
            <span>Sophia Williams</span>
            <span>sophia.williams@company.com</span>
            <span>(501) 555-9128</span>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <vaadin-accordion-panel disabled>
          <div slot="summary">Billing address</div>

          <vaadin-vertical-layout>
            <span>4027 Amber Lake Canyon</span>
            <span>72333-5884 Cozy Nook</span>
            <span>Arkansas</span>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>

        <!-- tag::snippet[] -->
        <vaadin-accordion-panel disabled>
          <div slot="summary">Payment</div>

          <vaadin-vertical-layout>
            <span>MasterCard</span>
            <span>1234 5678 9012 3456</span>
            <span>Expires 06/21</span>
          </vaadin-vertical-layout>
        </vaadin-accordion-panel>
      </vaadin-accordion>
      <!-- end::snippet[] -->
    `;
  }
}
