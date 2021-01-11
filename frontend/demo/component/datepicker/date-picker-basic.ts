import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'themes/theme-generated.js';

// tag::snippet[]
@customElement('date-picker-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-date-picker label="Birthday"></vaadin-date-picker>
    `;
  }
}
// end::snippet[]
