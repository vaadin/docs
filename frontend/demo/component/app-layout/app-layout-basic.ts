import 'Frontend/demo/init'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/scroller';
import '@vaadin/side-nav';
import { applyTheme } from 'Frontend/generated/theme';
import { patchSideNavNavigation } from 'Frontend/demo/component/side-nav/side-nav-helper'; // hidden-source-line

@customElement('app-layout-basic')
export class Example extends LitElement {
  static override styles = css`
    h1 {
      font-size: var(--lumo-font-size-l);
      margin: 0;
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
      <vaadin-app-layout>
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <h1 slot="navbar">MyApp</h1>
        <vaadin-scroller slot="drawer" class="p-s">
          <vaadin-side-nav>
            <vaadin-side-nav-item path="/dashboard">
              <vaadin-icon icon="vaadin:dashboard"></vaadin-icon>
              Dashboard
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/orders">
              <vaadin-icon icon="vaadin:cart"></vaadin-icon>
              Orders
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/customers">
              <vaadin-icon icon="vaadin:user-heart"></vaadin-icon>
              Customers
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/products">
              <vaadin-icon icon="vaadin:package"></vaadin-icon>
              Products
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/documents">
              <vaadin-icon icon="vaadin:records"></vaadin-icon>
              Documents
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/tasks">
              <vaadin-icon icon="vaadin:list"></vaadin-icon>
              Tasks
            </vaadin-side-nav-item>
            <vaadin-side-nav-item path="/analytics">
              <vaadin-icon icon="vaadin:chart"></vaadin-icon>
              Analytics
            </vaadin-side-nav-item>
          </vaadin-side-nav>
        </vaadin-scroller>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
