import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';

@customElement('checkbox-horizontal')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox-group label="Permissions" theme="horizontal">
        <vaadin-checkbox>Read</vaadin-checkbox>
        <vaadin-checkbox>Edit</vaadin-checkbox>
        <vaadin-checkbox>Delete</vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
