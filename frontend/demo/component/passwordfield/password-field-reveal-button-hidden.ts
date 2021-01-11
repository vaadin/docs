import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('password-field-reveal-button-hidden')
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
      <vaadin-password-field
        label="Password"
        value="Ex@mplePassw0rd"
        reveal-button-hidden
      ></vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }
}
