import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';

@customElement('progress-bar-determinate')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field label="Financials.xlsx" theme="helper-above-field" style="width: 100%">
        <div slot="helper" style="display: flex; justify-content: space-between;">
          <div>Processing row 58/116...</div>
          <div>50%</div>
        </div>
        <vaadin-progress-bar value="0.5"></vaadin-progress-bar>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
