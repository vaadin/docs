import '@vaadin/breadcrumb';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('breadcrumb-basic')
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
        <vaadin-breadcrumb-item>Home</vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item>Products</vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item>Electronics</vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item>Laptops</vaadin-breadcrumb-item>
      </vaadin-breadcrumb>
      <!-- end::snippet[] -->
    `;
  }
}
