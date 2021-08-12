import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-date-time-picker/vaadin-date-time-picker';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';

const initialStartValue = '2020-08-25T20:00';
const initialEndValue = '2020-09-01T20:00';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('date-time-picker-range')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private startDateTime = initialStartValue;

  @state()
  private endDateTime = initialEndValue;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <div>
        <vaadin-date-time-picker
          label="Start date and time"
          .value="${this.startDateTime}"
          @value-changed="${(e: CustomEvent) => (this.startDateTime = e.detail.value)}"
        ></vaadin-date-time-picker>
        <vaadin-date-time-picker
          label="End date and time"
          .min="${this.startDateTime}"
          .value="${this.endDateTime}"
          @value-changed="${(e: CustomEvent) => (this.endDateTime = e.detail.value)}"
        ></vaadin-date-time-picker>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
