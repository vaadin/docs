import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector.js'; // hidden-source-line

import { customElement, html, LitElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';

const initialStartValue = '2020-08-25T20:00';
const initialEndValue = '2020-09-01T20:00';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-time-picker-range')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private startDateTime = initialStartValue;

  @internalProperty()
  private endDateTime = initialEndValue;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Start date and time"
        .value="${this.startDateTime}"
        @value-changed="${(e: CustomEvent) => (this.startDateTime = e.detail.value)}"
      ></vaadin-date-time-picker>

      <vaadin-date-time-picker
        label="End date and time"
        .min="${this.startDateTime}"
        .value="${this.endDateTime}"
        @value-changed="${(e: CustomEvent) => (this.endDateTime = e.detail.value)}"
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
