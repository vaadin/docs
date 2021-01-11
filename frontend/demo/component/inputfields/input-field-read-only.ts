import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('input-field-read-only')
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
      <vaadin-text-field label="Read-only" value="Value" readonly></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
