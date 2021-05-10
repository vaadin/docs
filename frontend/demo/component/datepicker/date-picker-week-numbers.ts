import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-source-line

import { html, LitElement, customElement, query } from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { DatePickerElement } from '@vaadin/vaadin-date-picker/vaadin-date-picker';

@customElement('date-picker-week-numbers')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @query('vaadin-date-picker')
  private datePicker?: DatePickerElement;

  // tag::snippet[]
  firstUpdated() {
    if (this.datePicker) {
      this.datePicker.i18n = {
        ...this.datePicker.i18n,
        firstDayOfWeek: 1,
      };
    }
  }

  render() {
    return html`
      <vaadin-date-picker label="Vacation start date" show-week-numbers></vaadin-date-picker>
    `;
  }
  // end::snippet[]
}
