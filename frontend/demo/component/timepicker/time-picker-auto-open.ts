import '../../init'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';

@customElement('time-picker-auto-open')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker
        label="Alarm"
        value="05:30"
        .step=${60 * 30}
        auto-open-disabled
      ></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
