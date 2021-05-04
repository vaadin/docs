import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { Binder, field } from '@vaadin/form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';

@customElement('date-picker-custom-validation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  private binder = new Binder(this, AppointmentModel);

  firstUpdated() {
    this.binder.for(this.binder.model.startDate).addValidator({
      message: 'The selected day of week is not available',
      validate: (startDate: string) => {
        const date = new Date(`${startDate} `);
        const validWeekDay = date.getDay() >= 1 && date.getDay() <= 5;
        return validWeekDay;
      },
    });
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-picker
        label="Meeting date"
        helper-text="Mondays-Fridays only"
        ...="${field(this.binder.model.startDate)}"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
