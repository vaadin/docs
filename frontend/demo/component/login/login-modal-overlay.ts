import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import { applyTheme } from 'generated/theme';
import '@vaadin/vaadin-login/vaadin-login-overlay';
import '@vaadin/vaadin-button/vaadin-button';

@customElement('login-modal-overlay')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private loginOpened = false;

  openLoginOverlay() {
    this.loginOpened = true;
  }
  performLogin() {
    this.loginOpened = false;
  }
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button @click=${this.openLoginOverlay} theme="primary">
        Log in
      </vaadin-button>
      <vaadin-login-overlay
        .opened=${this.loginOpened}
        @login=${this.performLogin}
      ></vaadin-login-overlay>
      <!-- end::snippet[] -->
    `;
  }
}
