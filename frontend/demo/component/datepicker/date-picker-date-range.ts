import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import { DatePickerValueChangedEvent } from '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-date-range')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private departureDate = '';

  @state()
  private returnDate = '';

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout theme="spacing">
        <vaadin-date-picker
          label="Departure date"
          @value-changed="${(e: DatePickerValueChangedEvent) =>
            (this.departureDate = e.detail.value)}"
          .max="${this.returnDate}"
        ></vaadin-date-picker>
        <vaadin-date-picker
          label="Return date"
          @value-changed="${(e: DatePickerValueChangedEvent) => (this.returnDate = e.detail.value)}"
          .min="${this.departureDate}"
        ></vaadin-date-picker>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
