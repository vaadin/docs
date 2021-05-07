import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
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
        label="Payment"
        @change="${(e: CustomFieldValueChanged) => (this.customFieldValue = e.detail.value)}"
      >
        <input type="text" placeholder="Card number" maxlength="16" />
        <input type="text" placeholder="CVV" style="width: 6em" maxlength="3" />
      </vaadin-custom-field>
      <p><strong>Custom field value:</strong> ${this.customFieldValue}</p>
      <!-- end::snippet[] -->
    `;
  }
}
