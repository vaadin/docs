import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/datepickerConnector.js'; // hidden-full-source-line

import { customElement, html, LitElement, query } from 'lit-element';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';
import { DateTimePicker } from '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';

@customElement('date-time-picker-week-numbers')
export class Example extends LitElement {
  // tag::snippet[]
  @query('vaadin-date-time-picker')
  private dateTimePicker?: DateTimePicker;

  firstUpdated() {
    this.dateTimePicker!.i18n = {
      ...this.dateTimePicker!.i18n,
      firstDayOfWeek: 1
    };
  }

  render() {
    return html`
      <vaadin-date-time-picker
        label="Meeting date and time"
        show-week-numbers
      ></vaadin-date-time-picker>
    `;
  }
  // end::snippet[]
}
