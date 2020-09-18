import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-date-picker';

@customElement('input-field-required')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field
        label="Name"
        required
        error-message="This field is required"
      ></vaadin-text-field>
      <vaadin-date-picker label="Date of birth"></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
