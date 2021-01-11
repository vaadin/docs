import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/datepickerConnector.js'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';

// NOTE: Use a date utility library for more fluent DX
const date = new Date();
date.setMilliseconds(0);
date.setSeconds(0);
date.setMinutes(0);
const minValue = date.toISOString().slice(0, -1);

date.setDate(date.getDate() + 7);
const initialValue = date.toISOString().slice(0, -1);

date.setDate(date.getDate() + 53);
const maxValue = date.toISOString().slice(0, -1);
import { applyTheme } from 'themes/theme-generated.js';

@customElement('date-time-picker-min-max')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Appointment date and time"
        helper-text="Must be within 60 days from today"
        .value=${initialValue}
        .min=${minValue}
        .max=${maxValue}
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
