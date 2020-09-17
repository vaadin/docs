import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-text-field';

@customElement('input-field-focus-styles')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field label="Pointer focus" focused></vaadin-text-field>
      <vaadin-text-field label="Keyboard focus" focused focus-ring></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
