import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-icons/vaadin-icons';

@customElement('tabs-navigation-mobile')
export class Example extends LitElement {
  static get styles() {
    return css`
      vaadin-app-layout {
        --vaadin-app-layout-touch-optimized: true;
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout>
        <h3 slot="navbar">MyApp</h3>
        <vaadin-tabs slot="navbar touch-optimized" style="max-width: 100%;">
          <vaadin-tab theme="icon-on-top">
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:dashboard"></iron-icon>
              Dashboards
            </a>
          </vaadin-tab>
          <vaadin-tab theme="icon-on-top">
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:records"></iron-icon>
              Orders
            </a>
          </vaadin-tab>
          <vaadin-tab theme="icon-on-top">
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:user-heart"></iron-icon>
              Customers
            </a>
          </vaadin-tab>
        </vaadin-tabs>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
