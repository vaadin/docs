import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';

@customElement('time-picker-seconds-step')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker label="Message received" value="15:45:08" step="1"></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
