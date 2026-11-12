import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-picker';
import { addDays, formatISO, isWeekend, parseISO } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { DatePicker, DatePickerDate, DatePickerValidatedEvent } from '@vaadin/date-picker';
import { applyTheme } from 'Frontend/demo/theme';

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

  // tag::snippet[]
  private closedDates = [3, 4].map((days) =>
    formatISO(addDays(new Date(), days), { representation: 'date' })
  );

  private isOfficeClosed = (isoDate: string) =>
    isWeekend(parseISO(isoDate)) || this.closedDates.includes(isoDate);

  private isDateDisabled = ({ year, month, day }: DatePickerDate) =>
    this.isOfficeClosed(formatISO(new Date(year, month, day), { representation: 'date' }));

  protected override render() {
    return html`
      <vaadin-date-picker
        label="Appointment date"
        helper-text="Must be a business day within 60 days from today"
        required
        .min="${formatISO(this.minDate, { representation: 'date' })}"
        .max="${formatISO(this.maxDate, { representation: 'date' })}"
        .isDateDisabled="${this.isDateDisabled}"
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
          } else if (this.isOfficeClosed(field.value)) {
            this.errorMessage = 'The office is closed, choose another date';
          } else {
            this.errorMessage = '';
          }
        }}"
      ></vaadin-date-picker>
    `;
  }
  // end::snippet[]
}
