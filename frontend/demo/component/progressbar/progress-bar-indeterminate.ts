import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';

@customElement('progress-bar-indeterminate')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <div style="font-family: var(--lumo-font-family); color: var(--lumo-secondary-text-color);">
        <div>Generating report...</div>
        <vaadin-progress-bar indeterminate></vaadin-progress-bar>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
