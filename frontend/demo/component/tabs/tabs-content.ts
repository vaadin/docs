import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import '@vaadin/vaadin-lumo-styles/typography';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('tabs-content')
export class Example extends LitElement {
  @state()
  private content = '';

  @state()
  private pages = ['Dashboard', 'Payment', 'Shipping'];

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-tabs @selected-changed="${this.selectedChanged}">
        <vaadin-tab>Dashboard</vaadin-tab>
        <vaadin-tab>Payment</vaadin-tab>
        <vaadin-tab>Shipping</vaadin-tab>
      </vaadin-tabs>

      <vaadin-vertical-layout theme="padding">
        <p>${this.content}</p>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }

  selectedChanged(e: CustomEvent) {
    this.content = `This is the ${this.pages[e.detail.value]} tab`;
  }
}
