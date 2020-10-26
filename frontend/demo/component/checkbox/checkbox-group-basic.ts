import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';

@customElement('checkbox-group-basic')
export class Example extends LitElement {
  @property({ type: Array })
  private value = ['0', '2'];

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox-group
        label="Export data"
        .value=${this.value}
        @value-changed=${(e: CustomEvent) => (this.value = e.detail.value)}
        theme="vertical"
      >
        <vaadin-checkbox value="0">Order ID</vaadin-checkbox>
        <vaadin-checkbox value="1">Product name</vaadin-checkbox>
        <vaadin-checkbox value="2">Customer</vaadin-checkbox>
        <vaadin-checkbox value="3">Status</vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
