import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/tabs';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('tabs-theme-minimal')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs theme="minimal">
        <vaadin-tab>Details</vaadin-tab>
        <vaadin-tab>Payment</vaadin-tab>
        <vaadin-tab>Shipping</vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
