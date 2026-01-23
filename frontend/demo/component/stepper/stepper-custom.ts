import '@vaadin/stepper';
import '@vaadin/icon';
import '@vaadin/icons';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('stepper-custom')
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
        <vaadin-step state="completed">
          <vaadin-icon icon="vaadin:user" slot="prefix"></vaadin-icon>
          <span>Account</span>
        </vaadin-step>
        <vaadin-step state="active">
          <vaadin-icon icon="vaadin:envelope" slot="prefix"></vaadin-icon>
          <span>Email verification</span>
        </vaadin-step>
        <vaadin-step>
          <vaadin-icon icon="vaadin:lock" slot="prefix"></vaadin-icon>
          <span>Security</span>
        </vaadin-step>
        <vaadin-step>
          <vaadin-icon icon="vaadin:check" slot="prefix"></vaadin-icon>
          <span>Complete</span>
        </vaadin-step>
      </vaadin-stepper>
      <!-- end::snippet[] -->
    `;
  }
}
