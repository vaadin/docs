import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('time-picker-minutes-step')
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
        label="Meeting time"
        value="12:30"
        .step="${60 * 30}"
      ></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
