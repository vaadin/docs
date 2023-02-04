import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/date-picker';
import type { DatePicker, DatePickerDate, DatePickerChangeEvent } from '@vaadin/date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

@customElement('date-picker-custom-functions')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('vaadin-date-picker')
  private datePicker!: DatePicker;

  @state()
  private selectedDateValue: string = dateFnsFormat(new Date(), 'yyyy-MM-dd');

  // tag::snippet[]
  protected override firstUpdated() {
    const formatDateIso8601 = (dateParts: DatePickerDate): string => {
      const { year, month, day } = dateParts;
      const date = new Date(year, month, day);

      return dateFnsFormat(date, 'yyyy-MM-dd');
    };

    const parseDateIso8601 = (inputValue: string): DatePickerDate => {
      const date = dateFnsParse(inputValue, 'yyyy-MM-dd', new Date());

      return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
    };

    this.datePicker.i18n = {
      ...this.datePicker.i18n,
      formatDate: formatDateIso8601,
      parseDate: parseDateIso8601,
    };
  }

  // end::snippet[]

  protected override render() {
    return html`
      <vaadin-date-picker
        label="Select a date:"
        value="${this.selectedDateValue}"
        helper-text="Date picker configured to use ISO 8601 format"
        @change="${(event: DatePickerChangeEvent) => {
          this.selectedDateValue = event.target.value;
        }}"
      ></vaadin-date-picker>
    `;
  }
}
