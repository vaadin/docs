import 'Frontend/demo/init'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';
import { patchAppLayoutNavigation } from './app-layout-helper'; // hidden-source-line

@customElement('app-layout-bottom-navbar')
export class Example extends LitElement {
  static override styles = css`
    h1 {
      font-size: var(--lumo-font-size-l);
      margin: var(--lumo-space-m) var(--lumo-space-l);
    }

    /* hidden-source-line: the bottom navbar is forced on in the example */
    vaadin-app-layout /* hidden-source-line */ {
      --vaadin-app-layout-touch-optimized: true; /* hidden-source-line */
    } /* hidden-source-line */
  `;

  /* prettier-ignore */ protected firstUpdated() {
    /* hidden-source-line */
    patchAppLayoutNavigation(
      this.shadowRoot!.querySelector('vaadin-horizontal-layout')!
    ); /* hidden-source-line */
  } /* hidden-source-line */

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- --vaadin-app-layout-touch-optimized is only enforced as part of this example -->
      <vaadin-app-layout style="--vaadin-app-layout-touch-optimized: true">
        <h1 slot="navbar">MyApp</h1>
        <vaadin-horizontal-layout
          slot="navbar touch-optimized"
          class="w-full justify-evenly self-stretch"
        >
          <a href="/dashboard" aria-label="Dashboard" class="text-secondary px-l flex items-center">
            <vaadin-icon icon="vaadin:dashboard"></vaadin-icon>
          </a>
          <a href="/orders" aria-label="Orders" class="text-secondary px-l flex items-center">
            <vaadin-icon icon="vaadin:cart"></vaadin-icon>
          </a>
          <!-- end::snippet[] -->
          <a href="/customers" aria-label="Customers" class="text-secondary px-l flex items-center">
            <vaadin-icon icon="vaadin:user-heart"></vaadin-icon>
          </a>
          <a href="/products" aria-label="Products" class="text-secondary px-l flex items-center">
            <vaadin-icon icon="vaadin:package"></vaadin-icon>
          </a>
          <!-- tag::snippet[] -->
        </vaadin-horizontal-layout>
        <div class="content">
          <h2>View title</h2>
          <p>View content</p>
        </div>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
