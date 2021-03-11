import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { applyTheme } from 'generated/theme';

@customElement('date-picker-min-max')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private today = '';

  @internalProperty()
  private upperLimit = '';

  firstUpdated() {
    this.today = this.fromDateToISOString(new Date());

    const upperLimit = new Date();
    upperLimit.setDate(upperLimit.getDate() + 60);
    this.upperLimit = this.fromDateToISOString(upperLimit);
  }

  fromDateToISOString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-date-picker
        .min=${this.today}
        .max=${this.upperLimit}
        label="Appointment date"
        helper-text="Must be within 60 days from today"
      ></vaadin-date-picker>
      <!-- end::snippet[] -->
    `;
  }
}
