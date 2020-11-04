import '../../init'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';

@customElement('date-time-picker-min-max')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Appointment time"
        value="08:30"
        min="08:00"
        max="16:00"
        .step=${60 * 30}
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
