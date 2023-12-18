import 'Frontend/demo/init'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/tabs';
import '@vaadin/side-nav';
import '@vaadin/vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';
import { patchSideNavNavigation } from 'Frontend/demo/component/side-nav/side-nav-helper'; // hidden-source-line

@customElement('app-layout-secondary-navigation')
export class Example extends LitElement {
  static override styles = css`
    h1 {
      font-size: var(--lumo-font-size-l);
      line-height: var(--lumo-size-l);
      margin: 0 var(--lumo-space-m);
    }

    h2 {
      font-size: var(--lumo-font-size-l);
      margin: 0;
    }

    vaadin-icon {
      box-sizing: border-box;
      margin-inline-end: var(--lumo-space-m);
      padding: var(--lumo-space-xs);
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  /* prettier-ignore */ protected firstUpdated() { // hidden-source-line
    patchSideNavNavigation(this.shadowRoot!.querySelector('vaadin-side-nav')!); // hidden-source-line
  } // hidden-source-line

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout primary-section="drawer">
        <h1 slot="drawer">MyApp</h1>
        <vaadin-side-nav slot="drawer" selected="1">
          <vaadin-side-nav-item path="/dashboard">
            <vaadin-icon icon="vaadin:dashboard"></vaadin-icon>
            <span>Dashboard</span>
          </vaadin-side-nav-item>
          <vaadin-side-nav-item path="/orders">
            <vaadin-icon icon="vaadin:cart"></vaadin-icon>
            <span>Orders</span>
          </vaadin-side-nav-item>
          <!-- end::snippet[] -->
          <vaadin-side-nav-item path="/customers">
            <vaadin-icon icon="vaadin:user-heart"></vaadin-icon>
            <span>Customers</span>
          </vaadin-side-nav-item>
          <vaadin-side-nav-item path="/products">
            <vaadin-icon icon="vaadin:package"></vaadin-icon>
            <span>Products</span>
          </vaadin-side-nav-item>
          <vaadin-side-nav-item path="/documents">
            <vaadin-icon icon="vaadin:records"></vaadin-icon>
            <span>Documents</span>
          </vaadin-side-nav-item>
          <vaadin-side-nav-item path="/tasks">
            <vaadin-icon icon="vaadin:list"></vaadin-icon>
            <span>Tasks</span>
          </vaadin-side-nav-item>
          <vaadin-side-nav-item path="/analytics">
            <vaadin-icon icon="vaadin:chart"></vaadin-icon>
            <span>Analytics</span>
          </vaadin-side-nav-item>
          <!-- tag::snippet[] -->
        </vaadin-side-nav>
        <vaadin-vertical-layout slot="navbar">
          <vaadin-horizontal-layout style="align-items: center;">
            <vaadin-drawer-toggle></vaadin-drawer-toggle>
            <h2>Orders</h2>
          </vaadin-horizontal-layout>
          <vaadin-tabs>
            <vaadin-tab>
              <a tabindex="-1">All</a>
            </vaadin-tab>
            <vaadin-tab>
              <a tabindex="-1">Open</a>
            </vaadin-tab>
            <!-- end::snippet[] -->
            <vaadin-tab>
              <a tabindex="-1">Completed</a>
            </vaadin-tab>
            <vaadin-tab>
              <a tabindex="-1">Cancelled</a>
            </vaadin-tab>
            <!-- tag::snippet[] -->
          </vaadin-tabs>
        </vaadin-vertical-layout>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
