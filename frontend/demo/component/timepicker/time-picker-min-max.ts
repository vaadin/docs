import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from `lit/decorators.js`;
import '@vaadin/vaadin-time-picker/vaadin-time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('time-picker-min-max')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker
        label="Appointment time"
        helper-text="Open 8:00-16:00"
        value="08:30"
        min="08:00"
        max="16:00"
        .step="${60 * 30}"
      ></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
