import '@vaadin/breadcrumb';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('breadcrumb-items')
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
        <vaadin-breadcrumb-item>Dashboard</vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item>Reports</vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item>Monthly</vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item>2024</vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item>January</vaadin-breadcrumb-item>
      </vaadin-breadcrumb>
      <!-- end::snippet[] -->
    `;
  }
}
