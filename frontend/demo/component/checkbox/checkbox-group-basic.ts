import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-group-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private value = ['0', '2'];

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox-group
        label="Export data"
        .value="${this.value}"
        @value-changed="${(e: CustomEvent) => (this.value = e.detail.value)}"
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
