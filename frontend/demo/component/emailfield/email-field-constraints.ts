import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/email-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('email-field-constraints')
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
      <vaadin-email-field
        pattern="^.+@example\\.com$"
        required
        min-length="13"
        max-length="20"
        label="Email address"
        error-message="Enter a valid example.com email address"
        helper-text="Only example.com addresses allowed"
      ></vaadin-email-field>
      <!-- end::snippet[] -->
    `;
  }
}
