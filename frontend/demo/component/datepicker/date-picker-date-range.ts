import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { DatePickerValueChanged } from '@vaadin/vaadin-date-picker/vaadin-date-picker';

@customElement('date-picker-date-range')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private departureDate = '';

  @internalProperty()
  private returnDate = '';

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-picker
        label="Departure date"
        @value-changed="${(e: DatePickerValueChanged) => (this.departureDate = e.detail.value)}"
        .max="${this.returnDate}"
      ></vaadin-date-picker>
      <vaadin-date-picker
        label="Return date"
        @value-changed="${(e: DatePickerValueChanged) => (this.returnDate = e.detail.value)}"
        .min="${this.departureDate}"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
