import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';

@customElement('time-picker-parsing')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-select label="Locale"></vaadin-select>
      <vaadin-time-picker label="Time"></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
