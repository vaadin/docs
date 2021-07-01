import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-tabs/vaadin-tabs';

@customElement('tabs-icons-horizontal')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs>
        <vaadin-tab theme="icon-on-top">
          <vaadin-icon icon="vaadin:user"></vaadin-icon>
          <span>Profile</span>
        </vaadin-tab>
        <vaadin-tab theme="icon-on-top">
          <vaadin-icon icon="vaadin:cog"></vaadin-icon>
          <span>Settings</span>
        </vaadin-tab>
        <vaadin-tab theme="icon-on-top">
          <vaadin-icon icon="vaadin:bell"></vaadin-icon>
          <span>Notifications</span>
        </vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
