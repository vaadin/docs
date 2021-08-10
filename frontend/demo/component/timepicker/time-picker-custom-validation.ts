import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';
import { Binder, field } from '@vaadin/form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('time-picker-custom-validation')
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
    this.binder.for(this.binder.model.startTime).addValidator({
      message: 'The selected time is not available',
      validate: (startTime: string) => {
        return (
          (startTime >= '08:00' && startTime <= '12:00') ||
          (startTime >= '13:00' && startTime <= '16:00')
        );
      },
    });
  }

  render() {
    return html`
      <vaadin-time-picker
        label="Appointment time"
        helper-text="Open 8:00-12:00, 13:00-16:00"
        min="08:00"
        max="16:00"
        .step="${60 * 30}"
        ...="${field(this.binder.model.startTime)}"
      ></vaadin-time-picker>
    `;
  }
  // end::snippet[]
}
