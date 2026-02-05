import '@vaadin/stepper';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('stepper-disabled')
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
        <vaadin-step label="Step 1" href="#/step1" state="completed"> </vaadin-step>
        <vaadin-step label="Step 2 (Unavailable)" href="#/step2" disabled state="active">
        </vaadin-step>
        <vaadin-step label="Step 3" href="#/step3"> </vaadin-step>
      </vaadin-stepper>
      <!-- end::snippet[] -->
    `;
  }
}
