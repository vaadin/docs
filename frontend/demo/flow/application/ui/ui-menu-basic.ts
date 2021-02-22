import { LitElement, html, customElement } from 'lit-element';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';

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
        </vaadin-tabs>
      </vaadin-horizontal-layout>
      <!-- end::snippet[] -->
    `;
  }

  onClick() {
    console.log('clicked');
  }
}
