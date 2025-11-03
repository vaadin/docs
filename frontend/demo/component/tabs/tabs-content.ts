import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/tabs';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { TabsSelectedChangedEvent } from '@vaadin/tabs';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('tabs-content')
export class Example extends LitElement {
  @state()
  private content = '';

  @state()
  private pages = ['Dashboard', 'Payment', 'Shipping'];

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
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

  selectedChanged(e: TabsSelectedChangedEvent) {
    this.content = `This is the ${this.pages[e.detail.value]} tab`;
  }
}
