import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/tabs';

@customElement('tabs-theme-small')
export class Example extends LitElement {
  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs theme="small">
        <vaadin-tab>Details</vaadin-tab>
        <vaadin-tab>Payment</vaadin-tab>
        <vaadin-tab>Shipping</vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
