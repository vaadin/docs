import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-login/vaadin-login-overlay';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('login-modal-overlay-internationalization')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-login-overlay></vaadin-login-overlay>
      <!-- end::snippet[] -->
    `;
  }
}
