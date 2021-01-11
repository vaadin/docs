import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('input-field-disabled')
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
      <vaadin-text-field label="Disabled" value="Value" disabled></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
