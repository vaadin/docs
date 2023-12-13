import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/time-picker';
import type { TimePickerChangeEvent } from '@vaadin/time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('time-picker-min-max')
export class Example extends LitElement {
  @state()
  protected errorMessage = '';

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker
        label="Appointment time"
        helper-text="Open 8:00-16:00"
        value="08:30"
        min="08:00"
        max="16:00"
        .step="${60 * 30}"
        error-message="${this.errorMessage}"
        @change="${(event: TimePickerChangeEvent) => {
          const { min, max, value } = event.target;
          if (value < min) {
            this.errorMessage = 'Too early, choose another time';
          } else if (value > max) {
            this.errorMessage = 'Too late, choose another time';
          } else {
            this.errorMessage = '';
          }
        }}"
      ></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
