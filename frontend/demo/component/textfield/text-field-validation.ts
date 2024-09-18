import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { TextField, TextFieldValidatedEvent } from '@vaadin/text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-field-validation')
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
      <vaadin-text-field
        required
        min-length="5"
        max-length="18"
        pattern="^[+]?[\\(]?[0-9]{3}[\\)]?[\\-]?[0-9]{3}[\\-]?[0-9]{4,6}$"
        allowed-char-pattern="[0-9()+-]"
        label="Phone number"
        helper-text="Format: +(123)456-7890"
        .errorMessage="${this.errorMessage}"
        @validated=${(event: TextFieldValidatedEvent) => {
          const field = event.target as TextField;
          const value = field.value;
          if (!value) {
            this.errorMessage = 'Field is required';
          } else if (value.length < field.minlength!) {
            this.errorMessage = `Minimum length is ${field.minlength} characters`;
          } else if (value.length > field.maxlength!) {
            this.errorMessage = `Maximum length is ${field.maxlength} characters`;
          } else if (!new RegExp(field.pattern).test(value)) {
            this.errorMessage = 'Invalid phone number format';
          } else {
            this.errorMessage = '';
          }
        }}
      ></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
