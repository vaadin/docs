import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, query } from 'lit-element';
import { EmailFieldElement } from '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';

@customElement('email-field-pattern')
export class Example extends LitElement {
  @query('[name="example-email"]') exampleEmail!: EmailFieldElement;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-email-field
        label="Enter your example address"
        name="example-email"
        placeholder="username@example.com"
        error-message="Please enter a valid example.com email address"
        clear-button-visible
      ></vaadin-email-field>
      <!-- end::snippet[] -->
    `;
  }

  firstUpdated() {
    if (this.exampleEmail) {
      this.exampleEmail.pattern = '^.+@example\\.com$';
    }
  }
}
