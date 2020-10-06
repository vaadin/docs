import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-password-field';

@customElement('input-field-helper')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-password-field
        label="Password"
        helper-text="A password must be at least 8 characters.
          It has to have at least one letter and one digit."
        pattern="^(?=.*[0-9])(?=.*[a-zA-Z]).{8}.*$"
        error-message="Not a valid password"
      >
      </vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }
}
