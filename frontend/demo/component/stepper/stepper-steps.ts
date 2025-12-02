import '@vaadin/stepper';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('stepper-steps')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-stepper>
        <vaadin-step label="Personal details" description="Name, email and phone" state="completed">
        </vaadin-step>
        <vaadin-step label="Address" description="Street, city and postal code" state="active">
        </vaadin-step>
        <vaadin-step label="Payment" description="Credit card or PayPal"> </vaadin-step>
        <vaadin-step label="Confirmation" description="Review and submit"> </vaadin-step>
      </vaadin-stepper>
      <!-- end::snippet[] -->
    `;
  }
}
