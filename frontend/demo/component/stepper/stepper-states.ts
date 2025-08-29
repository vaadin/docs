import '@vaadin/stepper';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('stepper-states')
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
        <vaadin-step label="Completed step" state="completed"></vaadin-step>
        <vaadin-step label="Active step" state="active"></vaadin-step>
        <vaadin-step label="Error step" state="error"></vaadin-step>
        <vaadin-step label="Inactive step"></vaadin-step>
      </vaadin-stepper>
      <!-- end::snippet[] -->
    `;
  }
}
