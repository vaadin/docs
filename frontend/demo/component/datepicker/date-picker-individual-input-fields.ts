import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-individual-input-fields')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
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
      <vaadin-horizontal-layout theme="spacing-s">
        <vaadin-combo-box label="Day" .items="${this.days}" style="width: 5em;"></vaadin-combo-box>
        <vaadin-combo-box
          label="Month"
          .items="${this.months}"
          style="width: 9em;"
        ></vaadin-combo-box>
        <vaadin-combo-box
          label="Year"
          .items="${this.years}"
          style="width: 6em;"
        ></vaadin-combo-box>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
