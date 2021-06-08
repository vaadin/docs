import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { Binder, field } from 'Frontend/../target/flow-frontend/form';
import AppointmentModel from 'Frontend/generated/com/vaadin/demo/domain/AppointmentModel';
import { differenceInDays, parseISO, isAfter } from 'date-fns';

@customElement('custom-field-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  private binder = new Binder(this, AppointmentModel);

  firstUpdated() {
    // aria-label for screen readers
    const start = this.shadowRoot
      ?.getElementById('start')
      ?.shadowRoot?.querySelector('[part="text-field"]')
      ?.shadowRoot?.querySelector('[part="value"]');
    start?.setAttribute('aria-label', 'Start date');
    start?.removeAttribute('aria-labelledby');

    const end = this.shadowRoot
      ?.getElementById('end')
      ?.shadowRoot?.querySelector('[part="text-field"]')
      ?.shadowRoot?.querySelector('[part="value"]');
    end?.setAttribute('aria-label', 'End date');
    end?.removeAttribute('aria-labelledby');

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

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field
        label="Enrollment period"
        helper-text="Cannot be longer than 30 days"
        required
        ...="${field(this.binder.model.enrollmentPeriod)}"
      >
        <vaadin-date-picker id="start" placeholder="Start date"></vaadin-date-picker>
        &ndash;
        <vaadin-date-picker id="end" placeholder="End date"></vaadin-date-picker>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
