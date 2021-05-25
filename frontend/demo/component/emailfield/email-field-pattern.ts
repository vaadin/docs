import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('email-field-pattern')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-email-field
        label="Email address"
        name="email"
        placeholder="username@example.com"
        error-message="Please enter a valid example.com email address"
        clear-button-visible
        pattern="^.+@example\\.com$"
      ></vaadin-email-field>
      <!-- end::snippet[] -->
    `;
  }
}
