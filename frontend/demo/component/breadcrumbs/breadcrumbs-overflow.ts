import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/breadcrumbs';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('breadcrumbs-overflow')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-breadcrumbs style="width: 300px">
        <vaadin-breadcrumbs-item path="/">Home</vaadin-breadcrumbs-item>
        <vaadin-breadcrumbs-item path="/catalog">Catalog</vaadin-breadcrumbs-item>
        <vaadin-breadcrumbs-item path="/catalog/electronics">Electronics</vaadin-breadcrumbs-item>
        <vaadin-breadcrumbs-item path="/catalog/electronics/computers"
          >Computers</vaadin-breadcrumbs-item
        >
        <vaadin-breadcrumbs-item path="/catalog/electronics/computers/laptops"
          >Laptops</vaadin-breadcrumbs-item
        >
        <vaadin-breadcrumbs-item>Model X1</vaadin-breadcrumbs-item>
      </vaadin-breadcrumbs>
      <!-- end::snippet[] -->
    `;
  }
}
