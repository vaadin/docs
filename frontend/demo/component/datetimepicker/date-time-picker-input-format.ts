import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/datepickerConnector.js'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';

@customElement('date-time-picker-input-format')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Select date and time"
        helper-text="Format: DD/MM/YYYY and HH:MM"
        date-placeholder="DD/MM/YYYY"
        time-placeholder="HH:MM"
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
