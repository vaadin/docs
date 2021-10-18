import '../../../init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/tabs';

@customElement('fusion-application-ui-menu')
export class UiMenu extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-horizontal-layout>
        <vaadin-tabs orientation="vertical">
          <vaadin-tab>Mercury</vaadin-tab>
          <vaadin-tab>Venus</vaadin-tab>
          <vaadin-tab>Earth</vaadin-tab>
          <vaadin-tab>Mars</vaadin-tab>
          <vaadin-tab>Jupiter</vaadin-tab>
        </vaadin-tabs>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }

  onClick() {
    console.log('clicked');
  }
}
