import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-tabs/vaadin-tabs';

@customElement('tabs-hide-scroll-buttons')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs theme="hide-scroll-buttons">
        <vaadin-tab>Dashboards</vaadin-tab>
        <vaadin-tab>Orders</vaadin-tab>
        <vaadin-tab>Customers</vaadin-tab>
        <vaadin-tab>Products</vaadin-tab>
        <vaadin-tab>Documents</vaadin-tab>
        <vaadin-tab>Tasks</vaadin-tab>
        <vaadin-tab>Analytics</vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
