import '../../init'; // hidden-full-source-line

import { customElement, html, LitElement, property } from 'lit-element';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';

const initialStartValue = '2020-08-25T20:00';
const initialEndValue = '2020-09-01T20:00';

@customElement('date-time-picker-range')
export class Example extends LitElement {
  @property()
  startDateTime = initialStartValue;

  @property()
  endDateTime = initialEndValue;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Start date and time"
        .value=${this.startDateTime}
        @value-changed=${(e: CustomEvent) => (this.startDateTime = e.detail.value)}
      ></vaadin-date-time-picker>

      <vaadin-date-time-picker
        label="End date and time"
        .min=${this.startDateTime}
        .value=${this.endDateTime}
        @value-changed=${(e: CustomEvent) => (this.endDateTime = e.detail.value)}
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
