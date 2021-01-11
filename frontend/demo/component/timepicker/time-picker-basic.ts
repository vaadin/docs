import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('time-picker-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker label="Alarm" value="07:00"></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
