import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-time-picker';
import { addDays, format } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { DatePicker } from '@vaadin/date-picker';
import type { DateTimePicker, DateTimePickerValidatedEvent } from '@vaadin/date-time-picker';
import type { TimePicker } from '@vaadin/time-picker';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('date-time-picker-validation')
export class Example extends LitElement {
  @state()
  private errorMessage = '';

  @state()
  private minDate = new Date();

  @state()
  private maxDate = addDays(new Date(), 60);

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        required
        label="Appointment date and time"
        helper-text="Must be within 60 days from today"
        .min="${format(this.minDate, `yyyy-MM-dd'T'HH:00:00`)}"
        .max="${format(this.maxDate, `yyyy-MM-dd'T'HH:00:00`)}"
        .errorMessage="${this.errorMessage}"
        @validated="${(event: DateTimePickerValidatedEvent) => {
          const field = event.target as DateTimePicker;
          const datePicker: DatePicker = field.querySelector('[slot=date-picker]')!;
          const timePicker: TimePicker = field.querySelector('[slot=time-picker]')!;
          const hasBadDateInput =
            !datePicker.value && !!(datePicker.inputElement as HTMLInputElement).value;
          const hasBadTimeInput =
            !timePicker.value && !!(timePicker.inputElement as HTMLInputElement).value;
          const hasIncompleteInput =
            (datePicker.value && !timePicker.value) || (timePicker.value && !datePicker.value);

          if (hasBadDateInput || hasBadTimeInput) {
            this.errorMessage = 'Invalid date or time';
          } else if (hasIncompleteInput) {
            this.errorMessage = 'Missing date or time';
          } else if (!field.value) {
            this.errorMessage = 'Field is required';
          } else if (field.value < field.min!) {
            this.errorMessage = 'Too early, choose another date and time';
          } else if (field.value > field.max!) {
            this.errorMessage = 'Too late, choose another date and time';
          } else {
            this.errorMessage = '';
          }
        }}"
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
