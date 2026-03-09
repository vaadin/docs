import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/email-field';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { EmailField, EmailFieldValidatedEvent } from '@vaadin/email-field';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('email-field-validation')
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
      <vaadin-email-field
        required
        pattern="^[a-zA-Z0-9_\\-+]+(?:\\.[a-zA-Z0-9_\\-+]+)*@example\\.com$"
        label="Email address"
        helper-text="Only example.com addresses allowed"
        .errorMessage="${this.errorMessage}"
        @validated="${(event: EmailFieldValidatedEvent) => {
          const field = event.target as EmailField;
          const { validity } = field.inputElement as HTMLInputElement;
          if (validity.valueMissing) {
            this.errorMessage = 'Field is required';
          } else if (validity.patternMismatch) {
            this.errorMessage = 'Enter a valid example.com email address';
          } else {
            this.errorMessage = '';
          }
        }}"
      ></vaadin-email-field>
      <!-- end::snippet[] -->
    `;
  }
}
