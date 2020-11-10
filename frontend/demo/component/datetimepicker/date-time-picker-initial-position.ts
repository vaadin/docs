import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/datepickerConnector.js'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';

const currentYear = new Date().getFullYear();

@customElement('date-time-picker-initial-position')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Q4 deadline"
        .initialPosition=${`${currentYear}-12-31`}
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
