import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/tabs';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tabs-focus-ring')
export class Example extends LitElement {
  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs>
        <vaadin-tab focus-ring>Details</vaadin-tab>
        <vaadin-tab>Payment</vaadin-tab>
        <vaadin-tab>Shipping</vaadin-tab>
      </vaadin-tabs>
      <!-- end::snippet[] -->
    `;
  }
}
