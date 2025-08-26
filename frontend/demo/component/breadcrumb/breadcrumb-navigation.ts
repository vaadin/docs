import '@vaadin/breadcrumb';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('breadcrumb-navigation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-breadcrumb>
        <vaadin-breadcrumb-item href="/">Home</vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item href="/products">Products</vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item href="/products/electronics">Electronics</vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item>Laptop Pro X1</vaadin-breadcrumb-item>
      </vaadin-breadcrumb>
      <!-- end::snippet[] -->
    `;
  }
}
