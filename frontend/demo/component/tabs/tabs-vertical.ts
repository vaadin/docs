import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/tabs';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('tabs-vertical')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs orientation="vertical" style="height: 240px; width: 240px;">
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
