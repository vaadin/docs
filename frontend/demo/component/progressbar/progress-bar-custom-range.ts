import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';

@customElement('progress-bar-custom-range')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field
        label="Processing files..."
        helper-text="50/100 completed"
        theme="helper-above-field"
        style="width: 100%"
      >
        <vaadin-progress-bar min="0" max="100" value="50"></vaadin-progress-bar>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
