import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import type { DatePickerValueChangedEvent } from '@vaadin/vaadin-date-picker/vaadin-date-picker';

@customElement('date-picker-date-range')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @state()
  private departureDate = '';

  @state()
  private returnDate = '';

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-picker
        label="Departure date"
        @value-changed="${(e: DatePickerValueChangedEvent) =>
          (this.departureDate = e.detail.value)}"
        .max="${this.returnDate}"
      ></vaadin-date-picker>
      <vaadin-date-picker
        label="Return date"
        @value-changed="${(e: DatePickerValueChangedEvent) => (this.returnDate = e.detail.value)}"
        .min="${this.departureDate}"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
