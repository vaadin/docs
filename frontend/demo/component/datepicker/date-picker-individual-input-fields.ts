import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-individual-input-fields')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  private days = Array.from({ length: 31 }, (_, k) => k + 1);

  private months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  private years = Array.from({ length: 100 }, (_, k) => new Date().getFullYear() - 99 + k);

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-combo-box label="Day" .items="${this.days}" style="width: 5em;"></vaadin-combo-box>
      <vaadin-combo-box
        label="Month"
        .items="${this.months}"
        style="width: 9em;"
      ></vaadin-combo-box>
      <vaadin-combo-box label="Year" .items="${this.years}" style="width: 6em;"></vaadin-combo-box>
      <!-- end::snippet[] -->
    `;
  }
}
