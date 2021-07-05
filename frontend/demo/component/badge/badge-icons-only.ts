import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
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
      <!-- tag::snippet[] -->
      <vaadin-icon
        icon="vaadin:check-circle"
        theme="badge success pill"
        title="Confirmed"
        aria-label="Confirmed"
      ></vaadin-icon>
      <vaadin-icon
        icon="vaadin:close-circle"
        theme="badge error pill"
        title="Cancelled"
        aria-label="Cancelled"
      ></vaadin-icon>
      <!-- end::snippet[] -->
    `;
  }
}
