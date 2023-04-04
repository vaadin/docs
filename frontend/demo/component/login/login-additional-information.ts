import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/login';
import type { LoginOverlay } from '@vaadin/login';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-additional-information')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @query('vaadin-login-overlay')
  private login!: LoginOverlay;

  protected override firstUpdated() {
    this.login.i18n = {
      ...this.login.i18n,
      additionalInformation: `Contact admin@company.com if you're experiencing issues logging into your account`,
    };
  }

  protected override render() {
    return html`<vaadin-login-overlay opened></vaadin-login-overlay>`;
  }
  // end::snippet[]
}
