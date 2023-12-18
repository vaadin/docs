import 'Frontend/demo/init'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/side-nav';
import { applyTheme } from 'Frontend/generated/theme';
import { patchSideNavNavigation } from 'Frontend/demo/component/side-nav/side-nav-helper'; // hidden-source-line

@customElement('app-layout-navbar-placement-side')
export class Example extends LitElement {
  static override styles = css`
    h1 {
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
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <h1 slot="navbar">Dashboard</h1>
        <vaadin-side-nav slot="drawer">
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
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
