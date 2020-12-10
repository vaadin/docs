import '../../init'; // hidden-full-source-line

import { customElement, html, LitElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@polymer/iron-icon/iron-icon';

@customElement('text-field-basic')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field value="Value" clear-button-visible> </vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
