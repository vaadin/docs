import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';

@customElement('progress-bar-completion-time')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-custom-field
        label="Generating report, please wait..."
        helper-text="Process can take upwards of 10 minutes"
        style="width: 100%"
      >
        <vaadin-progress-bar indeterminate></vaadin-progress-bar>
      </vaadin-custom-field>
      <!-- end::snippet[] -->
    `;
  }
}
