import '@vaadin/custom-field';
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { CustomFieldValueChangedEvent } from '@vaadin/custom-field';

// tag::snippet[]
@customElement('my-text-field')
export class MyTextField extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';

  // custom properties that do not work with the default Binder
  @property({ type: Boolean }) mandatory = false;
  @property({ type: Boolean }) hasError = false;
  @property({ type: String }) error = '';

  // ...
  // end::snippet[]

  render() {
    return html`
      <vaadin-custom-field
        .label="${this.label}"
        .value="${this.value}"
        @value-changed="${this.onValueChanged}"
        .required="${this.mandatory}"
        .invalid="${this.hasError}"
        .errorMessage="${this.error}"
      >
        <vaadin-text-field></vaadin-text-field>
      </vaadin-custom-field>
    `;
  }

  onValueChanged(event: CustomFieldValueChangedEvent) {
    this.value = event.detail.value;
  }
  // tag::snippet[]
}
// end::snippet[]
