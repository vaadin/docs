import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-email-field';

// tag::snippet[]
@customElement('email-field-basic')
export class Example extends LitElement {
  render() {
    return html`<vaadin-email-field
      label="Email"
      name="email"
      error-message="Please enter a valid email address"
      clear-button-visible
    ></vaadin-email-field>`;
  }
}
// end::snippet[]
