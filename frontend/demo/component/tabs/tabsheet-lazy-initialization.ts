import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/tabs';
import '@vaadin/tabsheet';
import type { TabSheetSelectedChangedEvent } from '@vaadin/tabsheet';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('tabsheet-lazy-initialization')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private visitedTabs = new Set<number>();

  private selectedTabChanged(event: TabSheetSelectedChangedEvent) {
    this.visitedTabs = new Set([...this.visitedTabs, event.detail.value]);
  }

  protected override render() {
    return html`
      <vaadin-tabsheet @selected-changed=${this.selectedTabChanged}>
        <vaadin-tabs slot="tabs">
          <vaadin-tab id="dashboard-tab">Dashboard</vaadin-tab>
          <vaadin-tab id="payment-tab">Payment</vaadin-tab>
          <vaadin-tab id="shipping-tab">Shipping</vaadin-tab>
        </vaadin-tabs>

        ${this.visitedTabs.has(0)
          ? html`<div tab="dashboard-tab">This is the Dashboard tab content</div>`
          : ''}
        ${this.visitedTabs.has(1)
          ? html`<div tab="payment-tab">This is the Payment tab content</div>`
          : ''}
        ${this.visitedTabs.has(2)
          ? html`<div tab="shipping-tab">This is the Shipping tab content</div>`
          : ''}
      </vaadin-tabsheet>
    `;
  }
  // end::snippet[]
}
