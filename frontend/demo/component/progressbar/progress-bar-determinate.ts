import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';

@customElement('progress-bar-determinate')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-progress-bar value="0.5"></vaadin-progress-bar>
      <!-- end::snippet[] -->
    `;
  }
}
