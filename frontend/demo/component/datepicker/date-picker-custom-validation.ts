import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'generated/theme';
import { DatePickerElement } from '@vaadin/vaadin-date-picker/vaadin-date-picker';

@customElement('date-picker-custom-validation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <x-date-picker-working-days
        label="Meeting date"
        helper-text="Mondays-Fridays only"
      ></x-date-picker-working-days>
      <!-- end::snippet[] -->
    `;
  }
}

// tag::custom-validation[]
@customElement('x-date-picker-working-days')
class DatePickerWorkingDays extends DatePickerElement {
  checkValidity() {
    if (this._inputValue === '') {
      return true;
    }

    const dayOfTheWeek = new Date(this._inputValue).getDay();

    return dayOfTheWeek > 0 && dayOfTheWeek < 6;
  }
}
// end::custom-validation[]
