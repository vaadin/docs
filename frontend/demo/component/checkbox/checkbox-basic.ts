import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-checkbox/vaadin-checkbox';

@customElement('checkbox-basic')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-checkbox>I accept the terms and conditions</vaadin-checkbox>
      <!-- end::snippet[] -->
    `;
  }
}
