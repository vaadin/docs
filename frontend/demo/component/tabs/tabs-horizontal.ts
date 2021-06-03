import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-tabs/vaadin-tabs';

@customElement('tabs-horizontal')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs style="max-width: 100%; width: 400px;">
        <vaadin-tab>Analytics</vaadin-tab>
        <vaadin-tab>Customers</vaadin-tab>
        <vaadin-tab>Dashboards</vaadin-tab>
        <vaadin-tab>Documents</vaadin-tab>
        <vaadin-tab>Orders</vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
