import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import { applyTheme } from 'Frontend/generated/theme';
import type { CustomFieldValueChangedEvent } from '@vaadin/vaadin-custom-field/vaadin-custom-field';

@customElement('custom-field-native-input')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private customFieldValue = '';

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field
        label="Payment"
        @change="${(e: CustomFieldValueChangedEvent) => (this.customFieldValue = e.detail.value)}"
      >
        <input type="text" placeholder="Card number" maxlength="16" />
        <input type="text" placeholder="CVV" style="width: 6em" maxlength="3" />
      </vaadin-custom-field>
      <p><strong>Custom field value:</strong> ${this.customFieldValue}</p>
      <!-- end::snippet[] -->
    `;
  }
}
