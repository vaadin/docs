import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/scroller';
import '@vaadin/side-nav';
import '@vaadin/vertical-layout';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { patchSideNavNavigation } from 'Frontend/demo/component/side-nav/side-nav-helper'; // hidden-source-line
import { applyTheme } from 'Frontend/demo/theme';
import { patchAppLayoutNavigation } from './app-layout-helper'; // hidden-source-line

@customElement('app-layout-secondary-navigation')
export class Example extends LitElement {
  static override styles = css`
    h1 {
      font-size: 1.125rem;
      line-height: 2.75rem;
      margin: 0 var(--lumo-space-m);
    }

    h2 {
      font-size: 1.125rem;
      margin: 0;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  /* prettier-ignore */ protected firstUpdated() { // hidden-source-line
    patchSideNavNavigation(this.shadowRoot!.querySelector('vaadin-side-nav')!); // hidden-source-line
    patchAppLayoutNavigation(this.shadowRoot!.querySelector('#navigation')!); // hidden-source-line
  } // hidden-source-line

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout primary-section="drawer">
        <h1 slot="drawer">MyApp</h1>
        <vaadin-scroller slot="drawer" style="padding: 0.5rem">
          <vaadin-side-nav>
            <vaadin-side-nav-item path="/dashboard">
              <vaadin-icon icon="vaadin:dashboard" slot="prefix"></vaadin-icon>
              Dashboard
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/orders">
              <vaadin-icon icon="vaadin:cart" slot="prefix"></vaadin-icon>
              Orders
            </vaadin-side-nav-item>
            <!-- end::snippet[] -->
            <vaadin-side-nav-item path="/customers">
              <vaadin-icon icon="vaadin:user-heart" slot="prefix"></vaadin-icon>
              Customers
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/products">
              <vaadin-icon icon="vaadin:package" slot="prefix"></vaadin-icon>
              Products
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/documents">
              <vaadin-icon icon="vaadin:records" slot="prefix"></vaadin-icon>
              Documents
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/tasks">
              <vaadin-icon icon="vaadin:list" slot="prefix"></vaadin-icon>
              Tasks
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/analytics">
              <vaadin-icon icon="vaadin:chart" slot="prefix"></vaadin-icon>
              Analytics
            </vaadin-side-nav-item>
            <!-- tag::snippet[] -->
          </vaadin-side-nav>
        </vaadin-scroller>
        <vaadin-vertical-layout slot="navbar">
          <vaadin-horizontal-layout style="align-items: center;">
            <vaadin-drawer-toggle></vaadin-drawer-toggle>
            <h2>Orders</h2>
          </vaadin-horizontal-layout>
          <vaadin-horizontal-layout id="navigation" class="h-m justify-center gap-s">
            <a
              href="/all"
              class="flex items-center px-m text-secondary font-medium"
              style="text-decoration: none"
              >All</a
            >
            <a
              href="/open"
              class="flex items-center px-m text-secondary font-medium"
              style="text-decoration: none"
              >Open</a
            >
            <!-- end::snippet[] -->
            <a
              href="/completed"
              class="flex items-center px-m text-secondary font-medium"
              style="text-decoration: none"
              >Completed</a
            >
            <a
              href="/cancelled"
              class="flex items-center px-m text-secondary font-medium"
              style="text-decoration: none"
              >Cancelled</a
            >
            <!-- tag::snippet[] -->
          </vaadin-horizontal-layout>
        </vaadin-vertical-layout>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
