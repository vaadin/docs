import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'generated/theme';

@customElement('date-picker-initial-position')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  private lastDayOfTheYear = new Date(new Date().getFullYear(), 11, 31);

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-picker
        label="Q4 deadline"
        .initialPosition=${this.lastDayOfTheYear.toISOString().split('T')[0]}
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
