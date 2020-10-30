import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-number-field';

@customElement('number-field-basic')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-number-field label="Balance" value="200.00"></vaadin-number-field>
      <vaadin-number-field label="Balance" value="200.00"></vaadin-number-field>
      <!-- end::snippet[] -->
    `;
  }
}
