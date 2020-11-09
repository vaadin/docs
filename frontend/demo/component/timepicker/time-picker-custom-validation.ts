import '../../init'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';
import { Binder, field } from '@vaadin/form';
// import AppointmentModel from '../../../generated/com/vaadin/demo/domain/AppointmentModel';

@customElement('time-picker-custom-validation')
export class Example extends LitElement {
  // private binder = new Binder(this, AppointmentModel);

  firstUpdated() {
    // const model = this.binder.model;
    console.log(Binder, field);
    // this.binder.for(model.start).addValidator({
    //   message: 'Please enter a strong password',
    //   validate: (start: string) => {
    //     return start > '2020';
    //   }
    // });
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker
        label="Appointment time"
        min="08:00"
        max="16:00"
        .step=${60 * 30}
      ></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
