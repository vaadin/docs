import 'Frontend/demo/init'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('app-layout-basic')
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

      iron-icon {
        box-sizing: border-box;
        margin-inline-end: var(--lumo-space-m);
        margin-inline-start: var(--lumo-space-xs);
        padding: var(--lumo-space-xs);
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout>
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <h1 slot="navbar">MyApp</h1>
        <vaadin-tabs slot="drawer" orientation="vertical">
          <vaadin-tab>
            <a tabindex="-1">
              <iron-icon icon="vaadin:dashboard"></iron-icon>
              <span>Dashboard</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <iron-icon icon="vaadin:cart"></iron-icon>
              <span>Orders</span>
            </a>
          </vaadin-tab>
          <!-- end::snippet[] -->
          <vaadin-tab>
            <a tabindex="-1">
              <iron-icon icon="vaadin:user-heart"></iron-icon>
              <span>Customers</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <iron-icon icon="vaadin:package"></iron-icon>
              <span>Products</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <iron-icon icon="vaadin:records"></iron-icon>
              <span>Documents</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <iron-icon icon="vaadin:list"></iron-icon>
              <span>Tasks</span>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <iron-icon icon="vaadin:chart"></iron-icon>
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
