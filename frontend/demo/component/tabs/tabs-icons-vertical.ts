import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-icons/vaadin-icons';

@customElement('tabs-icons-vertical')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs orientation="vertical">
        <vaadin-tab>
          <iron-icon icon="vaadin:user"></iron-icon>
          <span>Tab one</span>
        </vaadin-tab>
        <vaadin-tab>
          <iron-icon icon="vaadin:cog"></iron-icon>
          <span>Tab two</span>
        </vaadin-tab>
        <vaadin-tab>
          <iron-icon icon="vaadin:bell"></iron-icon>
          <span>Tab three</span>
        </vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
