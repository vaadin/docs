import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/date-time-picker';
import { applyTheme } from 'Frontend/generated/theme';
import type { DateTimePicker } from '@vaadin/date-time-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import type { DatePickerDate } from '@vaadin/date-picker';

@customElement('date-time-picker-input-format')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('vaadin-date-time-picker')
  private accessor dateTimePicker!: DateTimePicker;

  protected override firstUpdated() {
    const _formatDate = (dateParts: DatePickerDate): string => {
      const { year, month, day } = dateParts;
      const date = new Date(year, month, day);

      return dateFnsFormat(date, 'dd/MM/yyyy');
    };

    const _parseDate = (inputValue: string): DatePickerDate => {
      const date = dateFnsParse(inputValue, 'dd/MM/yyyy', new Date());

      return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
    };

    this.dateTimePicker.i18n = {
      ...this.dateTimePicker.i18n,
      formatDate: _formatDate,
      parseDate: _parseDate,
    };
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Select date and time"
        helper-text="Format: DD/MM/YYYY and HH:MM"
        date-placeholder="Date"
        time-placeholder="Time"
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
