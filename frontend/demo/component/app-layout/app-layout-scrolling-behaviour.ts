import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-icons/vaadin-icons';

@customElement('app-layout-scrolling-behaviour')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout>
        <vaadin-drawer-toggle slot="navbar"></vaadin-drawer-toggle>
        <img
          slot="navbar"
          src="https://i.imgur.com/GPpnszs.png"
          alt="Vaadin Logo"
          width="100"
          height="31"
          referrerpolicy="no-referrer"
        />
        <vaadin-tabs
          slot="drawer"
          orientation="vertical"
          theme="minimal"
          style="margin: 0 auto; flex: 1;"
        >
          <vaadin-tab>
            <iron-icon icon="vaadin:home"></iron-icon>
            Page 1
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:list"></iron-icon>
            Page 2
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:options"></iron-icon>
            Page 3
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:question"></iron-icon>
            Page 4
          </vaadin-tab>
        </vaadin-tabs>

        <div class="content">
          <h3>Page title</h3>
          <p>Page content</p>
        </div>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
