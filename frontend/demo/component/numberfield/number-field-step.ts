import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-number-field';

@customElement('number-field-step')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-number-field label="Duration (hours)"></vaadin-number-field>
      <!-- end::snippet[] -->
    `;
  }
}
