import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('progress-bar-completion-time')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <div style="font-family: var(--lumo-font-family); color: var(--lumo-secondary-text-color);">
        <div>Generating report, please wait...</div>
        <vaadin-progress-bar indeterminate></vaadin-progress-bar>
        <div style="font-size: var(--lumo-font-size-xs)">
          Process can take upwards of 10 minutes
        </div>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
