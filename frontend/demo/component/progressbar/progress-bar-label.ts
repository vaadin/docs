import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-progress-bar/vaadin-progress-bar';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('progress-bar-label')
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
        <div style="display: flex; justify-content: space-between;">
          <div>Processing Financials.xlsx</div>
          <div>50%</div>
        </div>

        <vaadin-progress-bar value="0.5"></vaadin-progress-bar>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
