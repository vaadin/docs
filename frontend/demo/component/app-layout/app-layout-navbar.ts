import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';
import { patchAppLayoutNavigation } from './app-layout-helper'; // hidden-source-line

@customElement('app-layout-navbar')
export class Example extends LitElement {
  static override styles = css`
    h1 {
      font-size: 1.125rem;
      left: 1.5rem;
      margin: 0;
      position: absolute;
    }

    vaadin-tabs {
      margin: auto;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  /* prettier-ignore */ protected firstUpdated() { // hidden-source-line
    patchAppLayoutNavigation(this.shadowRoot!.querySelector('vaadin-horizontal-layout')!); // hidden-source-line
  } // hidden-source-line

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout>
        <h1 slot="navbar">MyApp</h1>
        <vaadin-horizontal-layout
          slot="navbar"
          style="width: 100%; height: 2.25rem; justify-content: center; gap: 0.5rem"
        >
          <a
            href="/dashboard"
            style="display: flex; align-items: center; padding: 0 1rem; font-weight: 500; text-decoration: none"
          >
            Dashboard
          </a>
          <a
            href="/orders"
            style="display: flex; align-items: center; padding: 0 1rem; font-weight: 500; text-decoration: none"
          >
            Orders
          </a>
          <!-- end::snippet[] -->
          <a
            href="/customers"
            style="display: flex; align-items: center; padding: 0 1rem; font-weight: 500; text-decoration: none"
          >
            Customers
          </a>
          <a
            href="/products"
            style="display: flex; align-items: center; padding: 0 1rem; font-weight: 500; text-decoration: none"
          >
            Products
          </a>
          <!-- tag::snippet[] -->
        </vaadin-horizontal-layout>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
