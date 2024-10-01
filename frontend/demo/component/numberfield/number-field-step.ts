import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/number-field';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { NumberField, NumberFieldValidatedEvent } from '@vaadin/number-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-step')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private errorMessage = '';

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-number-field
        label="Duration (hours)"
        step="0.5"
        value="12.5"
        step-buttons-visible
        .errorMessage="${this.errorMessage}"
        @validated="${(event: NumberFieldValidatedEvent) => {
          const field = event.target as NumberField;
          const { validity } = field.inputElement as HTMLInputElement;
          if (validity.badInput) {
            this.errorMessage = 'Invalid number format';
          } else if (validity.stepMismatch) {
            this.errorMessage = `Duration must be a multiple of ${field.step}`;
          } else {
            this.errorMessage = '';
          }
        }}"
      ></vaadin-number-field>
      <!-- end::snippet[] -->
    `;
  }
}
