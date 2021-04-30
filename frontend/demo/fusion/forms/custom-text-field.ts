import { LitElement, customElement, html, property } from 'lit-element';
import '@vaadin/vaadin-custom-field';
import '@vaadin/vaadin-text-field';
import type { CustomFieldValueChanged } from '@vaadin/vaadin-custom-field/vaadin-custom-field';

@customElement('custom-text-field')
export class CustomTextField extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) invalid = false;
  @property({ type: String }) errorMessage = '';

  onValueChanged(event: CustomFieldValueChanged) {
    this.value = event.detail.value;
  }

  render() {
    return html`
      <vaadin-custom-field
        .label="${this.label}"
        .value="${this.value}"
        @value-changed="${this.onValueChanged}"
        .required="${this.required}"
        .invalid="${this.invalid}"
        .errorMessage="${this.errorMessage}"
      >
        <vaadin-text-field></vaadin-text-field>
      </vaadin-custom-field>
    `;
  }
}
