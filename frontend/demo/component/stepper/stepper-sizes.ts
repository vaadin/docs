import '@vaadin/stepper';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('stepper-sizes')
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
      <vaadin-stepper theme="small">
        <vaadin-step label="Step 1" state="completed"></vaadin-step>
        <vaadin-step label="Step 2" state="active"></vaadin-step>
        <vaadin-step label="Step 3"></vaadin-step>
        <vaadin-step label="Step 4"></vaadin-step>
      </vaadin-stepper>
      <!-- end::snippet[] -->
    `;
  }
}
