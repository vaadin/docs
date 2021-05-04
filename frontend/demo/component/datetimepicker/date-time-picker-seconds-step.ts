import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector.js'; // hidden-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-time-picker-seconds-step')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

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
