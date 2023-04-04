import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/tabs';
import '@vaadin/tabsheet';

@customElement('tabsheet-theme-bordered')
export class Example extends LitElement {
  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabsheet theme="bordered">
        <vaadin-tabs slot="tabs">
          <vaadin-tab id="dashboard-tab">Dashboard</vaadin-tab>
          <vaadin-tab id="payment-tab">Payment</vaadin-tab>
          <vaadin-tab id="shipping-tab">Shipping</vaadin-tab>
        </vaadin-tabs>

        <div tab="dashboard-tab">This is the Dashboard tab content</div>
        <div tab="payment-tab">This is the Payment tab content</div>
        <div tab="shipping-tab">This is the Shipping tab content</div>
      </vaadin-tabsheet>
      <!-- end::snippet[] -->
    `;
  }
}
