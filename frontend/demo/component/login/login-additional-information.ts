import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, query } from 'lit-element';
import { applyTheme } from 'themes/theme-generated.js';
import '@vaadin/vaadin-login/vaadin-login-overlay';
import { LoginOverlayElement } from '@vaadin/vaadin-login/vaadin-login-overlay';

@customElement('login-additional-information')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  //tag::snippet[]
  @query('vaadin-login-overlay')
  private login?: LoginOverlayElement;
  firstUpdated() {
    if (this.login && this.login.i18n) {
      this.login.i18n = {
        ...this.login.i18n,
        additionalInformation: `Please, contact admin@company.com if you're experiecing issues logging into your account`
      };
    }
  }

  render() {
    return html`
      <vaadin-login-overlay opened></vaadin-login-overlay>
    `;
  }
  //end::snippet[]
}
