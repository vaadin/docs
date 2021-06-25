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

@customElement('app-layout-navbar-placement-side')
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
        margin: 0;
      }

      vaadin-icon {
        box-sizing: border-box;
        margin-inline-end: var(--lumo-space-m);
        padding: var(--lumo-space-xs);
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout primary-section="drawer">
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <h1 slot="navbar">Dashboard</h1>
        <vaadin-tabs slot="drawer" orientation="vertical">
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="vaadin:dashboard"></vaadin-icon>
              <span>Dashboard</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="vaadin:cart"></vaadin-icon>
              <span>Orders</span>
            </a>
          </vaadin-tab>
          <!-- end::snippet[] -->
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="vaadin:user-heart"></vaadin-icon>
              <span>Customers</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="vaadin:package"></vaadin-icon>
              <span>Products</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="vaadin:records"></vaadin-icon>
              <span>Documents</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="vaadin:list"></vaadin-icon>
              <span>Tasks</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="vaadin:chart"></vaadin-icon>
              <span>Analytics</span>
            </a>
          </vaadin-tab>
          <!-- tag::snippet[] -->
        </vaadin-tabs>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
