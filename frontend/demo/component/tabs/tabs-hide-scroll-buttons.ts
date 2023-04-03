import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/tabs';

@customElement('tabs-hide-scroll-buttons')
export class Example extends LitElement {
  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs theme="hide-scroll-buttons" style="max-width: 100%; width: 400px;">
        <vaadin-tab>Analytics</vaadin-tab>
        <vaadin-tab>Customers</vaadin-tab>
        <vaadin-tab>Dashboards</vaadin-tab>
        <vaadin-tab>Documents</vaadin-tab>
        <vaadin-tab>Orders</vaadin-tab>
        <vaadin-tab>Products</vaadin-tab>
        <vaadin-tab>Tasks</vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
