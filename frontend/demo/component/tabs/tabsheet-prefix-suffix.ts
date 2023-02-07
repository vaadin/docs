import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/tabs';
import '@vaadin/tabsheet';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('tabsheet-prefix-suffix')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-tabsheet>
        <!-- tag::snippet[] -->
        <vaadin-button slot="prefix">Close all</vaadin-button>

        <vaadin-button slot="suffix" theme="icon" aria-label="Add tab">
          <vaadin-icon icon="vaadin:plus"></vaadin-icon>
        </vaadin-button>
        <!-- end::snippet[] -->

        <vaadin-tabs slot="tabs">
          <vaadin-tab id="dashboard-tab">Dashboard</vaadin-tab>
          <vaadin-tab id="payment-tab">Payment</vaadin-tab>
          <vaadin-tab id="shipping-tab">Shipping</vaadin-tab>
        </vaadin-tabs>

        <div tab="dashboard-tab">This is the Dashboard tab content</div>
        <div tab="payment-tab">This is the Payment tab content</div>
        <div tab="shipping-tab">This is the Shipping tab content</div>
      </vaadin-tabsheet>
    `;
  }
}
