import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-picker';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Binder, field } from '@vaadin/hilla-lit-form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('date-picker-custom-validation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  private binder = new Binder(this, AppointmentModel);

  protected override firstUpdated() {
    this.binder.for(this.binder.model.startDate).addValidator({
      message: 'Select a weekday',
      validate: (startDate: string) => {
        const date = new Date(startDate);
        const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;
        return isWeekday;
      },
    });
  }

  protected override render() {
    return html`
      <vaadin-date-picker
        label="Meeting date"
        helper-text="Mondays – Fridays only"
        ${field(this.binder.model.startDate)}
      ></vaadin-date-picker>
    `;
  }
  // end::snippet[]
}
