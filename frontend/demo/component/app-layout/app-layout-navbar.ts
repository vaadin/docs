import 'Frontend/demo/init'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';
import { patchAppLayoutNavigation } from './app-layout-helper';

@customElement('app-layout-navbar')
export class Example extends LitElement {
  static override styles = css`
    h1 {
      font-size: var(--lumo-font-size-l);
      left: var(--lumo-space-l);
      margin: 0;
      position: absolute;
    }

    vaadin-tabs {
      margin: auto;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
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
        <vaadin-horizontal-layout slot="navbar" class="h-m w-full justify-center gap-s">
          <a
            href="/dashboard"
            class="flex items-center px-m text-secondary font-medium"
            style="text-decoration: none"
          >
            Dashboard
          </a>
          <a
            href="/orders"
            class="flex items-center px-m text-secondary font-medium"
            style="text-decoration: none"
          >
            Orders
          </a>
          <!-- end::snippet[] -->
          <a
            href="/customers"
            class="flex items-center px-m text-secondary font-medium"
            style="text-decoration: none"
          >
            Customers
          </a>
          <a
            href="/products"
            class="flex items-center px-m text-secondary font-medium"
            style="text-decoration: none"
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
