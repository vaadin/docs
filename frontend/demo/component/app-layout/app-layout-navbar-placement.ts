import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-icons/vaadin-icons';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('app-layout-navbar-placement')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      h1 {
        margin: 0 var(--lumo-space-s);
        font-size: var(--lumo-font-size-l);
      }

      iron-icon {
        padding: 0.25rem;
        box-sizing: border-box !important;
        margin: 0 4px;
        width: var(--lumo-icon-size-m);
        height: var(--lumo-icon-size-m);
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout>
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <h1 slot="navbar">MyApp</h1>
        <vaadin-tabs slot="drawer" orientation="vertical" theme="minimal">
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:dashboard"></iron-icon>
              Dashboards
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:cart"></iron-icon>
              Orders
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:user-heart"></iron-icon>
              Customers
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:package"></iron-icon>
              Products
            </a>
          </vaadin-tab>
        </vaadin-tabs>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
