import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';

@customElement('checkbox-group')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox-group label="Export data" theme="vertical">
        <vaadin-checkbox>Order ID</vaadin-checkbox>
        <vaadin-checkbox>Product name</vaadin-checkbox>
        <vaadin-checkbox>Customer</vaadin-checkbox>
        <vaadin-checkbox>Status</vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
