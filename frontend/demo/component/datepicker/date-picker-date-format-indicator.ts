import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-date-format-indicator')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-picker
        label="Start date"
        placeholder="DD/MM/YYYY"
        helper-text="Format: DD/MM/YYYY"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
