import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-icons/vaadin-icons';
import { applyTheme } from 'generated/theme';

@customElement('app-layout-placement-side')
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
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout primary-section="drawer">
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <h1 slot="navbar">Dashboards</h1>
        <vaadin-tabs slot="drawer" orientation="vertical" theme="minimal">
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
        </vaadin-tabs>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
