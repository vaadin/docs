import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/timepickerConnector.js'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector.js'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';

const currentYear = new Date().getFullYear();
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-time-picker-initial-position')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-time-picker
        label="Q4 deadline"
        .initialPosition="${`${currentYear}-12-31`}"
      ></vaadin-date-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
