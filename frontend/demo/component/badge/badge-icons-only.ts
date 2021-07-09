import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';

@customElement('badge-icons-only')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-icon
          aria-label="Confirmed"
          icon="vaadin:check"
          style="padding: var(--lumo-space-xs)"
          theme="badge success"
          title="Confirmed"
        ></vaadin-icon>
        <vaadin-icon
          aria-label="Cancelled"
          icon="vaadin:close-small"
          style="padding: var(--lumo-space-xs)"
          theme="badge error"
          title="Cancelled"
        ></vaadin-icon>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
