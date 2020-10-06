import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-email-field';

@customElement('email-field-pattern')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-email-field
        label="Enter your example address"
        name="example-email"
        placeholder="username@example.com"
        error-message="Please enter a valid example.com email address"
        clear-button-visible
        pattern="^.+@example\\.com$"
      ></vaadin-email-field>
      <!-- end::snippet[] -->
    `;
  }
}
