import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-integer-field';

@customElement('number-field-stepper-min-max')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-integer-field
        label="Quantity"
        helper-text="Max 10 items"
        min="0"
        max="10"
        value="2"
        has-controls
      ></vaadin-integer-field>
      <!-- end::snippet[] -->
    `;
  }
}
