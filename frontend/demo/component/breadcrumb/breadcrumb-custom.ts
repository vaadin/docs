import '@vaadin/breadcrumb';
import '@vaadin/icon';
import '@vaadin/icons';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('breadcrumb-custom')
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
        <vaadin-breadcrumb-item href="/">
          <vaadin-icon icon="vaadin:home" slot="prefix"></vaadin-icon>
          Home
        </vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item href="/docs">
          <vaadin-icon icon="vaadin:book" slot="prefix"></vaadin-icon>
          Documentation
        </vaadin-breadcrumb-item>
        <vaadin-breadcrumb-item>
          <vaadin-icon icon="vaadin:cube" slot="prefix"></vaadin-icon>
          Components
        </vaadin-breadcrumb-item>
      </vaadin-breadcrumb>
      <!-- end::snippet[] -->
    `;
  }
}
