import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-icons/vaadin-icons';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('app-layout-secondary-navigation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      h1,
      h2 {
        margin: 0 var(--lumo-space-s);
        font-size: var(--lumo-font-size-l);
      }

      h2 {
        align-self: center;
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout primary-section="drawer">
        <vaadin-vertical-layout slot="navbar">
          <vaadin-horizontal-layout>
            <vaadin-drawer-toggle></vaadin-drawer-toggle>
            <h2>Orders</h2>
          </vaadin-horizontal-layout>
          <vaadin-tabs>
            <vaadin-tab>All</vaadin-tab>
            <vaadin-tab>Open</vaadin-tab>
            <vaadin-tab>Completed</vaadin-tab>
            <vaadin-tab>Cancelled</vaadin-tab>
          </vaadin-tabs>
        </vaadin-vertical-layout>

        <h1 slot="drawer">MyApp</h1>

        <vaadin-tabs slot="drawer" selected="1" orientation="vertical">
          <vaadin-tab>
            <iron-icon icon="vaadin:dashboard"></iron-icon>
            Dashboards
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:cart"></iron-icon>
            Orders
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:user-heart"></iron-icon>
            Customers
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:package"></iron-icon>
            Products
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:records"></iron-icon>
            Documents
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:list"></iron-icon>
            Tasks
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:chart"></iron-icon>
            Analytics
          </vaadin-tab>
        </vaadin-tabs>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
