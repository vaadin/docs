import '../../init'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';
import { Binder, field } from '@vaadin/form';
import AppointmentModel from '../../../generated/com/vaadin/demo/domain/AppointmentModel';

@customElement('time-picker-custom-validation')
export class Example extends LitElement {
  // tag::snippet[]
  private binder = new Binder(this, AppointmentModel);

  firstUpdated() {
    this.binder.for(this.binder.model.start).addValidator({
      message: 'The selected time is not available',
      validate: (start: string) => {
        return (start >= '08:00' && start <= '12:00') || (start >= '13:00' && start <= '16:00');
      }
    });
  }

  render() {
    return html`
      <vaadin-time-picker
        label="Appointment time"
        helper-text="Open 8:00-12:00, 13:00-16:00"
        min="08:00"
        max="16:00"
        .step=${60 * 30}
        ...="${field(this.binder.model.start)}"
      ></vaadin-time-picker>
    `;
  }
  // end::snippet[]
}
