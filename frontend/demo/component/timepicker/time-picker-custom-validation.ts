import '../../init'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';

@customElement('time-picker-custom-validation')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker label="Alarm" value="08:30" min="08:00" max="16:00"></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
