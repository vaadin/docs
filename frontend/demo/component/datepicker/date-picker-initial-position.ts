import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { formatISO, lastDayOfYear } from 'date-fns';

@customElement('date-picker-initial-position')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  private lastDayOfTheYear = lastDayOfYear(Date.now());

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-picker
        label="Q4 deadline"
        .initialPosition="${formatISO(this.lastDayOfTheYear, { representation: 'date' })}"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
