import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/text-area';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { TextArea, TextAreaValidatedEvent } from '@vaadin/text-area';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-area-validation')
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
      <vaadin-text-area
        required
        minlength="5"
        maxlength="50"
        pattern="^[A-Z]([A-Za-z0-9,-\\s])*\\.$"
        allowed-char-pattern="[A-Za-z0-9,.\\-\\s]"
        label="Sentence"
        helper-text="Must be one complete sentence ending in a period, between 5 and 50 characters long"
        style="width:100%"
        .errorMessage="${this.errorMessage}"
        @validated="${(event: TextAreaValidatedEvent) => {
          const field = event.target as TextArea;
          const value = field.value;
          if (!value) {
            field.errorMessage = 'Field is required';
          } else if (value.length < field.minlength!) {
            field.errorMessage = `Minimum length is ${field.minlength} characters`;
          } else if (value.length > field.maxlength!) {
            field.errorMessage = `Maximum length is ${field.maxlength} characters`;
          } else if (!new RegExp(field.pattern).test(value)) {
            field.errorMessage = 'Must be one complete sentence ending in a period';
          } else {
            field.errorMessage = '';
          }
        }}"
      ></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
