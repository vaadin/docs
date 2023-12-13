import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/date-picker';
import type { DatePickerValueChangedEvent } from '@vaadin/date-picker';
import '@vaadin/horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-picker-date-range')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private departureDate = '';

  @state()
  private returnDate = '';

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout theme="spacing">
        <vaadin-date-picker
          label="Departure date"
          .max="${this.returnDate}"
          @value-changed="${(event: DatePickerValueChangedEvent) => {
            this.departureDate = event.detail.value;
          }}"
        ></vaadin-date-picker>
        <vaadin-date-picker
          label="Return date"
          .min="${this.departureDate}"
          @value-changed="${(event: DatePickerValueChangedEvent) => {
            this.returnDate = event.detail.value;
          }}"
        ></vaadin-date-picker>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }
}
