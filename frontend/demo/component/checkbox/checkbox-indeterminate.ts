import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';
import '@vaadin/vaadin-checkbox/vaadin-checkbox-group';

@customElement('checkbox-indeterminate')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox>Notify users</vaadin-checkbox>
      <br />
      <vaadin-checkbox-group label="Users to notify" theme="vertical">
        <vaadin-checkbox value="arya-jacobessen">Arya Jacobssen</vaadin-checkbox>
        <vaadin-checkbox value="klavdia-dedove">Klavdia Dedova</vaadin-checkbox>
        <vaadin-checkbox value="shirline-dungey">Shirline Dungey</vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
