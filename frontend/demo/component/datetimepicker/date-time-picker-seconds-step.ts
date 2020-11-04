import '../../init'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';

@customElement('date-time-picker-seconds-step')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Message received"
        value="2020-06-12T15:45:08"
        step="1"
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
