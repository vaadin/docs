import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/date-picker';
import { addDays, formatISO, isAfter, isBefore } from 'date-fns';
import dateFnsParse from 'date-fns/parse';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { DatePicker, DatePickerValidatedEvent } from '@vaadin/date-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-validation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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
        helper-text="Must be within 60 days from today"
        required
        .min="${formatISO(this.minDate, { representation: 'date' })}"
        .max="${formatISO(this.maxDate, { representation: 'date' })}"
        .errorMessage="${this.errorMessage}"
        @validated="${(event: DatePickerValidatedEvent) => {
          const field = event.target as DatePicker;
          const date = dateFnsParse(field.value ?? '', 'yyyy-MM-dd', new Date());
          const inputElement = field.inputElement as HTMLInputElement;
          if (!field.value && inputElement.value) {
            this.errorMessage = 'Invalid date format';
          } else if (!field.value) {
            this.errorMessage = 'Field is required';
          } else if (isBefore(date, this.minDate)) {
            this.errorMessage = 'Too early, choose another date';
          } else if (isAfter(date, this.maxDate)) {
            this.errorMessage = 'Too late, choose another date';
          } else {
            this.errorMessage = '';
          }
        }}"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
