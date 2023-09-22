import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/integer-field';
import '@vaadin/login';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-overlay-custom-form-area')
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
      <!-- no-autofocus is used to prevent the example from stealing focus when browsing the documentation -->
      <vaadin-login-overlay opened no-autofocus>
        <vaadin-integer-field
          slot="custom-form-area"
          name="code"
          label="One-time code"
        ></vaadin-integer-field>
      </vaadin-login-overlay>
      <!-- end::snippet[] -->
    `;
  }
}
