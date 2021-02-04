import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import { registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-tabs/vaadin-tabs';

@customElement('tabs-navigation-desktop-horizontal')
export class Example extends LitElement {
  static get styles() {
    return css`
      vaadin-app-layout h3 {
        align-self: start;
      }
    `;
  }

  constructor() {
    registerStyles(
      'vaadin-app-layout',
      css`
        [part~='navbar'] {
          flex-direction: column;
        }
      `
    );

    super();
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout>
        <h3 slot="navbar">MyApp</h3>
        <vaadin-tabs slot="navbar" style="max-width: 100%;">
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
