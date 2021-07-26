import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { Binder, field } from '@vaadin/form';
import { applyTheme } from 'Frontend/generated/theme';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';

@customElement('date-picker-custom-validation')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  private binder = new Binder(this, AppointmentModel);

  firstUpdated() {
    this.binder.for(this.binder.model.startDate).addValidator({
      message: 'Please select a weekday',
      validate: (startDate: string) => {
        const date = new Date(startDate);
        const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;
        return isWeekday;
      },
    });
  }

  render() {
    return html`
      <vaadin-date-picker
        label="Meeting date"
        helper-text="Mondays – Fridays only"
        ...="${field(this.binder.model.startDate)}"
      ></vaadin-date-picker>
    `;
  }
  // end::snippet[]
}
