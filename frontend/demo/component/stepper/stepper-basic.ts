import '@vaadin/stepper';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('stepper-basic')
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
        <vaadin-step
          label="Shipping address"
          description="Enter your shipping details"
        ></vaadin-step>
        <vaadin-step label="Billing address" description="Enter your billing details"></vaadin-step>
        <vaadin-step label="Payment method" description="Select payment option"></vaadin-step>
        <vaadin-step label="Review order" description="Review and confirm your order"></vaadin-step>
      </vaadin-stepper>
      <!-- end::snippet[] -->
    `;
  }
}
