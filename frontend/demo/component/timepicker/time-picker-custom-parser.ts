import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';

@customElement('time-picker-custom-parser')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker label="Alarm"></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
