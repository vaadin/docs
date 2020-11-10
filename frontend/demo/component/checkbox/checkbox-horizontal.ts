import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';

@customElement('checkbox-horizontal')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox-group label="Permissions">
        <vaadin-checkbox value="read">Read</vaadin-checkbox>
        <vaadin-checkbox value="edit">Edit</vaadin-checkbox>
        <vaadin-checkbox value="delete">Delete</vaadin-checkbox>
      </vaadin-checkbox-group>
      <!-- end::snippet[] -->
    `;
  }
}
