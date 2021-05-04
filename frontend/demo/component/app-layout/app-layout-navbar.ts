import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-icons/vaadin-icons';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('app-layout-navbar')
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

      vaadin-tabs {
        box-shadow: none;
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout>
        <h1 slot="navbar">MyApp</h1>
        <vaadin-tabs slot="navbar" style="margin: 0 auto;">
          <vaadin-tab>
            <a tabindex="-1" target="_self">Dashboards</a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">Orders</a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">Customers</a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">Products</a>
          </vaadin-tab>
        </vaadin-tabs>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
