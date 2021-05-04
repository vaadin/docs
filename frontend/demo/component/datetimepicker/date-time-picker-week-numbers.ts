import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector.js'; // hidden-source-line

import { customElement, html, LitElement, query } from 'lit-element';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';
import { DateTimePickerElement } from '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-time-picker-week-numbers')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @query('vaadin-date-time-picker')
  private dateTimePicker?: DateTimePickerElement;

  firstUpdated() {
    if (this.dateTimePicker) {
      this.dateTimePicker.i18n = {
        ...this.dateTimePicker.i18n,
        firstDayOfWeek: 1,
      };
    }
  }

  render() {
    return html`
      <vaadin-date-time-picker
        label="Meeting date and time"
        show-week-numbers
      ></vaadin-date-time-picker>
    `;
  }
  // end::snippet[]
}
