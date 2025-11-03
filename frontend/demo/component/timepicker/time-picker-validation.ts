import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/time-picker';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { TimePicker, TimePickerValidatedEvent } from '@vaadin/time-picker';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('time-picker-validation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  protected errorMessage = '';

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-time-picker
        label="Appointment time"
        helper-text="Open 8:00-16:00"
        value="08:30"
        required
        min="08:00"
        max="16:00"
        .step="${60 * 30}"
        .errorMessage="${this.errorMessage}"
        @validated="${(event: TimePickerValidatedEvent) => {
          const field = event.target as TimePicker;
          if (!field.value && (field.inputElement as HTMLInputElement).value) {
            this.errorMessage = 'Invalid time format';
          } else if (!field.value) {
            this.errorMessage = 'Field is required';
          } else if (field.value < field.min) {
            this.errorMessage = 'Too early, choose another time';
          } else if (field.value > field.max) {
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
