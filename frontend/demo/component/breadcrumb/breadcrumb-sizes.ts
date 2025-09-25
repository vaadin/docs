import '@vaadin/breadcrumb';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('breadcrumb-sizes')
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
      <div style="display: flex; flex-direction: column; gap: var(--lumo-space-m);">
        <vaadin-breadcrumb theme="small">
          <vaadin-breadcrumb-item href="/">Home</vaadin-breadcrumb-item>
          <vaadin-breadcrumb-item href="/docs">Documentation</vaadin-breadcrumb-item>
          <vaadin-breadcrumb-item>Components</vaadin-breadcrumb-item>
        </vaadin-breadcrumb>

        <vaadin-breadcrumb>
          <vaadin-breadcrumb-item href="/">Home</vaadin-breadcrumb-item>
          <vaadin-breadcrumb-item href="/docs">Documentation</vaadin-breadcrumb-item>
          <vaadin-breadcrumb-item>Components</vaadin-breadcrumb-item>
        </vaadin-breadcrumb>

        <vaadin-breadcrumb theme="large">
          <vaadin-breadcrumb-item href="/">Home</vaadin-breadcrumb-item>
          <vaadin-breadcrumb-item href="/docs">Documentation</vaadin-breadcrumb-item>
          <vaadin-breadcrumb-item>Components</vaadin-breadcrumb-item>
        </vaadin-breadcrumb>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
