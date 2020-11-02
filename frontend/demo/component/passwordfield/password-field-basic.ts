import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-password-field';

@customElement('password-field-basic')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-password-field label="Password" value="Ex@mplePassw0rd"></vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }
}
