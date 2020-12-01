import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty, css } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-tabs/vaadin-tabs';

@customElement('tabs-navigation-desktop-vertical')
export class Example extends LitElement {
  @internalProperty()
  private opened: Boolean = false;

  firstUpdated() {
    this.opened = true;
  }

  static get styles() {
    return css`
      vaadin-app-layout {
        --vaadin-app-layout-drawer-overlay: false;
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout drawer-opened="${this.opened}">
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <h3 slot="navbar">MyApp</h3>
        <vaadin-tabs slot="drawer" orientation="vertical" style="margin: 0 auto; flex: 1;">
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              Dashboards
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              Orders
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              Customers
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              Products
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              Documents
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              Tasks
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              Analytics
            </a>
          </vaadin-tab>
        </vaadin-tabs>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
