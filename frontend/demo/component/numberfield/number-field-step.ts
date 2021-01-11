import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-number-field';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('number-field-step')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-number-field
        label="Duration (hours)"
        step="0.5"
        value="12.5"
        has-controls
      ></vaadin-number-field>
      <!-- end::snippet[] -->
    `;
  }
}
