import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-tabs/vaadin-tabs';

@customElement('tabs-states')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs>
        <vaadin-tab>Selected</vaadin-tab>
        <vaadin-tab>Unselected</vaadin-tab>
        <vaadin-tab disabled>Disabled</vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
