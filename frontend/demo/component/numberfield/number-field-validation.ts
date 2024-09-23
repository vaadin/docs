import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/integer-field';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { IntegerField, IntegerFieldValidatedEvent } from '@vaadin/integer-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-validation')
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
      <vaadin-integer-field
        label="Quantity"
        helper-text="Max 10 items"
        required
        min="1"
        max="10"
        value="2"
        step-buttons-visible
        .errorMessage="${this.errorMessage}"
        @validated="${(event: IntegerFieldValidatedEvent) => {
          const field = event.target as IntegerField;
          if ((field.inputElement as HTMLInputElement).validity.badInput) {
            this.errorMessage = 'Invalid number format';
          } else if (!field.value) {
            this.errorMessage = 'Field is required';
          } else if (Number(field.value) < 1) {
            this.errorMessage = 'Quantity must be at least 1';
          } else if (Number(field.value) > 10) {
            this.errorMessage = 'Maximum 10 items available';
          } else {
            this.errorMessage = '';
          }
        }}"
      ></vaadin-integer-field>
      <!-- end::snippet[] -->
    `;
  }
}
