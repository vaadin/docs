import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/checkbox';
import '@vaadin/checkbox-group';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-group-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
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
        <vaadin-checkbox value="0" label="Order ID"></vaadin-checkbox>
        <vaadin-checkbox value="1" label="Product name"></vaadin-checkbox>
        <vaadin-checkbox value="2" label="Customer"></vaadin-checkbox>
        <vaadin-checkbox value="3" label="Status"></vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
