import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/custom-field';
import type { CustomFieldChangeEvent } from '@vaadin/custom-field';
import '@vaadin/horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('custom-field-native-input')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private customFieldValue = '';

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field
        label="Payment information"
        theme="whitespace"
        @change="${(event: CustomFieldChangeEvent) => {
          this.customFieldValue = event.target.value ?? '';
        }}"
      >
        <vaadin-horizontal-layout theme="spacing-s">
          <input
            aria-label="Cardholder name"
            pattern="[\\p{L} \\-]+"
            placeholder="Cardholder name"
            required
            type="text"
          />
          <input
            aria-label="Card number"
            pattern="[\\d ]{12,23}"
            placeholder="Card number"
            required
            type="text"
          />
          <input
            aria-label="Security code"
            pattern="[0-9]{3,4}"
            placeholder="Security code"
            required
            type="text"
          />
        </vaadin-horizontal-layout>
      </vaadin-custom-field>
      <p><b>Payment information:</b> ${this.customFieldValue}</p>
      <!-- end::snippet[] -->
    `;
  }
}
