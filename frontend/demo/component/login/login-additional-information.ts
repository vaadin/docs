import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/vaadin-login/vaadin-login-overlay';
import { LoginOverlayElement } from '@vaadin/vaadin-login/vaadin-login-overlay';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-additional-information')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  //tag::snippet[]
  @query('vaadin-login-overlay')
  private login?: LoginOverlayElement;
  firstUpdated() {
    if (this.login && this.login.i18n) {
      this.login.i18n = {
        ...this.login.i18n,
        additionalInformation: `Please, contact admin@company.com if you're experiencing issues logging into your account`,
      };
    }
  }

  render() {
    return html`<vaadin-login-overlay opened></vaadin-login-overlay>`;
  }
  //end::snippet[]
}
