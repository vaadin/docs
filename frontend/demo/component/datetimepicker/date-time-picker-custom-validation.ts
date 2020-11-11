import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/datepickerConnector.js'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';
import { Binder, field } from '@vaadin/form';
import AppointmentModel from '../../../generated/com/vaadin/demo/domain/AppointmentModel';

@customElement('date-time-picker-custom-validation')
export class Example extends LitElement {
  // tag::snippet[]
  private binder = new Binder(this, AppointmentModel);

  firstUpdated() {
    this.binder.for(this.binder.model.startDateTime).addValidator({
      message: 'The selected day of week is not available',
      validate: (startDateTime: string) => {
        const date = new Date(startDateTime);
        const validWeekDay = date.getDay() >= 1 && date.getDay() <= 5;
        return validWeekDay;
      }
    });
    this.binder.for(this.binder.model.startDateTime).addValidator({
      message: 'The selected time is not available',
      validate: (startDateTime: string) => {
        const time = startDateTime.split('T')[1];
        const validTime =
          (time >= '08:00' && time <= '12:00') || (time >= '13:00' && time <= '16:00');
        return validTime;
      }
    });
  }

  render() {
    return html`
      <vaadin-date-time-picker
        label="Appointment date and time"
        helper-text="Open Mondays-Fridays, 8:00-12:00, 13:00-16:00"
        .step="${60 * 30}"
        ...="${field(this.binder.model.startDateTime)}"
      ></vaadin-date-time-picker>
    `;
  }
  // end::snippet[]
}
