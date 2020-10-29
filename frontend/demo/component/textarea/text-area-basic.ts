import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-text-area';

@customElement('text-area-basic')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-area label="Description"></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
