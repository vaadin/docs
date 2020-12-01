import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty, css } from 'lit-element';
import '@vaadin/vaadin-tabs/vaadin-tabs';

@customElement('tabs-content')
export class Example extends LitElement {
  @internalProperty()
  private content: String = '';

  @internalProperty()
  private pages: Array<String> = ['Dashboard', 'Payment', 'Shipping'];

  static get styles() {
    return css`
      div.content {
        font-family: var(--lumo-font-family);
        padding: var(--lumo-space-m);
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs @selected-changed="${this.selectedChanged}">
        <vaadin-tab>Dashboard</vaadin-tab>
        <vaadin-tab>Payment</vaadin-tab>
        <vaadin-tab>Shipping</vaadin-tab>
      </vaadin-tabs>

      <div class="content">
        ${this.content}
      </div>
      <!-- end::snippet[] -->
    `;
  }

  selectedChanged(e: CustomEvent) {
    this.content = `This is ${this.pages[e.detail.value]} page`;
  }
}
