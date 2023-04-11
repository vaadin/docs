import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/date-time-picker';
import type { DateTimePickerValueChangedEvent } from '@vaadin/date-time-picker';
import { applyTheme } from 'Frontend/generated/theme';

const initialStartValue = '2020-08-25T20:00';
const initialEndValue = '2020-09-01T20:00';

@customElement('date-time-picker-range')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private startDateTime = initialStartValue;

  @state()
  private endDateTime = initialEndValue;

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <div>
        <vaadin-date-time-picker
          label="Start date and time"
          .value="${this.startDateTime}"
          @value-changed="${(event: DateTimePickerValueChangedEvent) => {
            this.startDateTime = event.detail.value;
          }}"
        ></vaadin-date-time-picker>

        <vaadin-date-time-picker
          label="End date and time"
          .min="${this.startDateTime}"
          .value="${this.endDateTime}"
          @value-changed="${(event: DateTimePickerValueChangedEvent) => {
            this.endDateTime = event.detail.value;
          }}"
        ></vaadin-date-time-picker>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
