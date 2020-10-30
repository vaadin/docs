import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';

@customElement('progress-bar-determinate')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <div>Financials.xlsx</div>
      <div
        style="display: flex; justify-content: space-between; color: var(--lumo-tertiary-text-color)"
      >
        <div>Processing row 58/116...</div>
        <div>50%</div>
      </div>
      <vaadin-progress-bar value="0.5"></vaadin-progress-bar>
      <!-- end::snippet[] -->
    `;
  }
}
