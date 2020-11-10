import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';

@customElement('time-picker-minutes-step')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker label="Meeting time" value="12:30" .step=${60 * 30}></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
