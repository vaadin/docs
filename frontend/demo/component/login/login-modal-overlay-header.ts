import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import { applyTheme } from 'themes/theme-generated.js';
import '@vaadin/vaadin-login/vaadin-login-overlay';

@customElement('login-modal-overlay-header')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-login-overlay
        title="TaskMob"
        description="Built with ♥ by Vaadin"
        opened
      ></vaadin-login-overlay>
      <!-- end::snippet[] -->
    `;
  }
}
