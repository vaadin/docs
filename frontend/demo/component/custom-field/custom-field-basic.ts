import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { Binder, field } from 'Frontend/../target/flow-frontend/form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';
import { differenceInDays, parseISO, isAfter } from 'date-fns';

@customElement('custom-field-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  private binder = new Binder(this, AppointmentModel);

  firstUpdated() {
    this.binder.for(this.binder.model.enrollmentPeriod).addValidator({
      message: 'Dates must be no longer than 30 days apart',
      validate: (enrollmentPeriod: string) => {
        const [from, to] = enrollmentPeriod.split('\t');

        if (from === '' || to === '') {
          return true;
        }

        return differenceInDays(parseISO(to), parseISO(from)) <= 30;
      },
    });
    this.binder.for(this.binder.model.enrollmentPeriod).addValidator({
      message: 'The first date should not be after the second date',
      validate: (enrollmentPeriod: string) => {
        const [from, to] = enrollmentPeriod.split('\t');

        if (from === '' || to === '') {
          return true;
        }

        return isAfter(parseISO(to), parseISO(from));
      },
    });
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field
        label="Enrollment period"
        helper-text="Cannot be longer than 30 days"
        required
        ...="${field(this.binder.model.enrollmentPeriod)}"
      >
        <vaadin-date-picker placeholder="From"></vaadin-date-picker>
        &ndash;
        <vaadin-date-picker placeholder="To"></vaadin-date-picker>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
