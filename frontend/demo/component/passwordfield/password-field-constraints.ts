import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/password-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('password-field-pattern')
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
      <vaadin-password-field
        allowed-char-pattern="[A-Za-z0-9]"
        required
        min-length="6"
        max-length="12"
        label="Password"
        helper-text="6 to 12 characters. Only letters A-Z and numbers supported."
      ></vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }
}
