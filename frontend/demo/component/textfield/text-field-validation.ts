import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { TextField, TextFieldValidatedEvent } from '@vaadin/text-field';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('text-field-validation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private errorMessage = '';

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field
        required
        minlength="5"
        maxlength="18"
        pattern="^[+]?[\\(]?[0-9]{3}[\\)]?[\\-]?[0-9]{3}[\\-]?[0-9]{4,6}$"
        allowed-char-pattern="[0-9()+-]"
        label="Phone number"
        helper-text="Format: +(123)456-7890"
        .errorMessage="${this.errorMessage}"
        @validated="${(event: TextFieldValidatedEvent) => {
          const field = event.target as TextField;
          const { validity } = field.inputElement as HTMLInputElement;
          if (validity.valueMissing) {
            this.errorMessage = 'Field is required';
          } else if (validity.tooShort) {
            this.errorMessage = `Minimum length is ${field.minlength} characters`;
          } else if (validity.tooLong) {
            this.errorMessage = `Maximum length is ${field.maxlength} characters`;
          } else if (validity.patternMismatch) {
            this.errorMessage = 'Invalid phone number format';
          } else {
            this.errorMessage = '';
          }
        }}"
      ></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
