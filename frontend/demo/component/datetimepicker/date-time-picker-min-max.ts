import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/date-time-picker';
import type { DateTimePickerChangeEvent } from '@vaadin/date-time-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { addDays, format, isAfter, isBefore, parseISO } from 'date-fns';

const dateTimeFormat = `yyyy-MM-dd'T'HH:00:00`;

@customElement('date-time-picker-min-max')
export class Example extends LitElement {
  @state()
  private errorMessage = '';

  @state()
  private initialValue = addDays(new Date(), 7);

  @state()
  private minDate = new Date();

  @state()
  private maxDate = addDays(new Date(), 60);

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Appointment date and time"
        helper-text="Must be within 60 days from today"
        .value="${format(this.initialValue, dateTimeFormat)}"
        .min="${format(this.minDate, dateTimeFormat)}"
        .max="${format(this.maxDate, dateTimeFormat)}"
        .errorMessage="${this.errorMessage}"
        @change="${({ target }: DateTimePickerChangeEvent) => {
          const date = parseISO(target.value ?? '');
          if (isBefore(date, this.minDate)) {
            this.errorMessage = 'Too early, choose another date and time';
          } else if (isAfter(date, this.maxDate)) {
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
