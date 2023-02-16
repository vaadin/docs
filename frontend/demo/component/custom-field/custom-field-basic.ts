import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/custom-field';
import '@vaadin/date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { Binder, field } from '@hilla/form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';
import { differenceInDays, parseISO, isAfter } from 'date-fns';
import { DatePicker } from '@vaadin/date-picker';

@customElement('custom-field-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('#start')
  private start!: DatePicker;

  @query('#end')
  private end!: DatePicker;

  private binder = new Binder(this, AppointmentModel);

  protected override firstUpdated() {
    // Set title for screen readers
    this.start.focusElement!.setAttribute('title', 'Start date');
    this.end.focusElement!.setAttribute('title', 'End date');

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
        <vaadin-date-picker id="start" placeholder="Start date"></vaadin-date-picker>
        &ndash;
        <vaadin-date-picker id="end" placeholder="End date"></vaadin-date-picker>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
