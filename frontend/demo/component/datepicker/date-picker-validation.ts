import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-picker';
import { addDays, formatISO, isWeekend, parseISO } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { DatePicker, DatePickerDate, DatePickerValidatedEvent } from '@vaadin/date-picker';
import { applyTheme } from 'Frontend/demo/theme';

// tag::snippet[]
const closedDates = [3, 4].map((days) =>
  formatISO(addDays(new Date(), days), { representation: 'date' })
);

function isOfficeClosed(isoDate: string): boolean {
  return isWeekend(parseISO(isoDate)) || closedDates.includes(isoDate);
}

const isDateDisabled = ({ year, month, day }: DatePickerDate) =>
  isOfficeClosed(formatISO(new Date(year, month, day), { representation: 'date' }));
// end::snippet[]

@customElement('date-picker-validation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private errorMessage = '';

  @state()
  private minDate = new Date();

  @state()
  private maxDate = addDays(new Date(), 60);

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-picker
        label="Appointment date"
        helper-text="Must be a business day within 60 days from today"
        required
        .min="${formatISO(this.minDate, { representation: 'date' })}"
        .max="${formatISO(this.maxDate, { representation: 'date' })}"
        .isDateDisabled="${isDateDisabled}"
        .errorMessage="${this.errorMessage}"
        @validated="${(event: DatePickerValidatedEvent) => {
          const field = event.target as DatePicker;
          if (!field.value && (field.inputElement as HTMLInputElement).value) {
            this.errorMessage = 'Invalid date format';
          } else if (!field.value) {
            this.errorMessage = 'Field is required';
          } else if (field.value < field.min!) {
            this.errorMessage = 'Too early, choose another date';
          } else if (field.value > field.max!) {
            this.errorMessage = 'Too late, choose another date';
          } else if (isOfficeClosed(field.value)) {
            this.errorMessage = 'The office is closed, choose another date';
          } else {
            this.errorMessage = '';
          }
        }}"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
