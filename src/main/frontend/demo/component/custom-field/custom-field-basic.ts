import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/custom-field';
import '@vaadin/date-picker';
import { differenceInDays, isAfter, parseISO } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Binder, field } from '@vaadin/hilla-lit-form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('custom-field-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  private binder = new Binder(this, AppointmentModel);

  protected override firstUpdated() {
    this.binder.for(this.binder.model.enrollmentPeriod).addValidator({
      message: 'Dates cannot be more than 30 days apart',
      validate: (enrollmentPeriod: string) => {
        const [from, to] = enrollmentPeriod.split('\t');

        if (from === '' || to === '') {
          return true;
        }

        return differenceInDays(parseISO(to), parseISO(from)) <= 30;
      },
    });
    this.binder.for(this.binder.model.enrollmentPeriod).addValidator({
      message: 'Start date must be earlier than end date',
      validate: (enrollmentPeriod: string) => {
        const [from, to] = enrollmentPeriod.split('\t');

        if (from === '' || to === '') {
          return true;
        }

        return isAfter(parseISO(to), parseISO(from));
      },
    });
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field
        label="Enrollment period"
        helper-text="Cannot be longer than 30 days"
        required
        ${field(this.binder.model.enrollmentPeriod)}
      >
        <vaadin-date-picker
          accessible-name="Start date"
          placeholder="Start date"
        ></vaadin-date-picker>
        &ndash;
        <vaadin-date-picker accessible-name="End date" placeholder="End date"></vaadin-date-picker>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
