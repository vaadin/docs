import 'Frontend/demo/init'; // hidden-full-source-line
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';
import { CustomFieldValueChanged } from '@vaadin/vaadin-custom-field/vaadin-custom-field';

@customElement('custom-field-native-input')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private customFieldValue = '';

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field
        label="Payment information"
        @change="${(e: CustomFieldValueChanged) => (this.customFieldValue = e.detail.value)}"
      >
        <vaadin-horizontal-layout theme="space-s">
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
