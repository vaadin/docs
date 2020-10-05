import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field';

@customElement('input-field-disabled')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field label="Disabled" value="Value" disabled></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
