import 'Frontend/demo/init'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('app-layout-navbar')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  static get styles() {
    return css`
      h1 {
        font-size: var(--lumo-font-size-l);
        left: var(--lumo-space-l);
        margin: 0;
        position: absolute;
      }

      vaadin-tabs {
        margin: auto;
      )
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout>
        <h1 slot="navbar">MyApp</h1>
        <vaadin-tabs slot="navbar">
          <vaadin-tab>
            <a tabindex="-1">Dashboard</a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">Orders</a>
          </vaadin-tab>
          <!-- end::snippet[] -->
          <vaadin-tab>
            <a tabindex="-1">Customers</a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">Products</a>
          </vaadin-tab>
          <!-- tag::snippet[] -->
        </vaadin-tabs>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
