import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/password-field';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { PasswordField, PasswordFieldValidatedEvent } from '@vaadin/password-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('password-field-validation')
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
      <vaadin-password-field
        pattern="^[A-Za-z0-9]+$"
        required
        minlength="6"
        maxlength="12"
        label="Password"
        helper-text="6 to 12 characters. Only letters A-Z and numbers supported."
        .errorMessage="${this.errorMessage}"
        @validated="${(event: PasswordFieldValidatedEvent) => {
          const field = event.target as PasswordField;
          const value = field.value;
          if (!value) {
            this.errorMessage = 'Field is required';
          } else if (value.length < field.minlength!) {
            this.errorMessage = `Minimum length is ${field.minlength} characters`;
          } else if (value.length > field.maxlength!) {
            this.errorMessage = `Maximum length is ${field.maxlength} characters`;
          } else if (!new RegExp(field.pattern).test(value)) {
            this.errorMessage = 'Only letters A-Z and numbers are allowed';
          } else {
            this.errorMessage = '';
          }
        }}"
      ></vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }
}
