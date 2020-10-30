import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';

@customElement('progress-bar-indeterminate')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <div>Generating report...</div>
      <vaadin-progress-bar indeterminate></vaadin-progress-bar>
      <!-- end::snippet[] -->
    `;
  }
}
