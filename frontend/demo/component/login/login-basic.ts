import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-login/vaadin-login-form';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('login-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-login-form></vaadin-login-form>
      <!-- end::snippet[] -->
    `;
  }
}
