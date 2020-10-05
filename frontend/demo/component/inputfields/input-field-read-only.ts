import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field';

@customElement('input-field-read-only')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field label="Read-only" value="Value" readonly></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
