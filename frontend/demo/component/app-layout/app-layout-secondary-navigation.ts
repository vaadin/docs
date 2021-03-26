import 'Frontend/demo/init'; // hidden-full-source-line
import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('app-layout-secondary-navigation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      h1 {
        font-size: var(--lumo-font-size-l);
        line-height: var(--lumo-size-l);
        margin: 0 var(--lumo-space-m);
      }

      h2 {
        font-size: var(--lumo-font-size-l);
        margin: 0;
      }

      iron-icon {
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
        <h1 slot="drawer">MyApp</h1>
        <vaadin-tabs slot="drawer" selected="1" orientation="vertical">
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
