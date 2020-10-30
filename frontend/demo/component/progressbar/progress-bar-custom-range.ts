import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';

@customElement('progress-bar-custom-range')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-progress-bar min="0" max="100" value="50"></vaadin-progress-bar>
      <!-- end::snippet[] -->
    `;
  }
}
