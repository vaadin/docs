import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-number-field';

@customElement('number-field-integer')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-number-field label="X"></vaadin-number-field>
      <vaadin-number-field label="Y"></vaadin-number-field>
      <!-- end::snippet[] -->
    `;
  }
}
