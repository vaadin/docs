import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-icons/vaadin-icons';

@customElement('tabs-icons-horizontal')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs>
        <vaadin-tab theme="icon-on-top">
          <iron-icon icon="vaadin:user"></iron-icon>
          <span>Tab one</span>
        </vaadin-tab>
        <vaadin-tab theme="icon-on-top">
          <iron-icon icon="vaadin:cog"></iron-icon>
          <span>Tab two</span>
        </vaadin-tab>
        <vaadin-tab theme="icon-on-top">
          <iron-icon icon="vaadin:bell"></iron-icon>
          <span>Tab three</span>
        </vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
