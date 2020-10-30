import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-number-field';

@customElement('number-field-stepper-min-max')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-number-field label="Quantity"></vaadin-number-field>
      <!-- end::snippet[] -->
    `;
  }
}
