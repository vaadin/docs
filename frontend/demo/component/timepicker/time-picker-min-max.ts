import '../../init'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';

@customElement('time-picker-min-max')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker
        label="Appointment time"
        helper-text="Open 8:00-16:00"
        value="08:30"
        min="08:00"
        max="16:00"
        .step=${60 * 30}
      ></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
