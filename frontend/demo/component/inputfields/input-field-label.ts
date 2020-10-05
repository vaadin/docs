import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-email-field';

@customElement('input-field-label')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-email-field label="Email address"></vaadin-email-field>
      <!-- end::snippet[] -->
    `;
  }
}
