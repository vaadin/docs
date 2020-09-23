import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-password-field';

@customElement('password-field-reveal-button-hidden')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-password-field
        label="Password"
        placeholder="Enter password"
        value="Ex@mplePassw0rd"
        reveal-button-hidden
      ></vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }
}
