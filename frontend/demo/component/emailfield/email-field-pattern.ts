import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('email-field-pattern')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
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
