import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import './login-overlay-mockup';
import type { LoginOverlayMockupElement } from './login-overlay-mockup';

@customElement('login-additional-information')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('login-overlay-mockup')
  private login!: LoginOverlayMockupElement;

  protected override firstUpdated() {
    this.login.i18n = {
      ...this.login.i18n,
      additionalInformation: `Contact admin@company.com if you're experiencing issues logging into your account`,
    };
  }

  protected override render() {
    return html`<login-overlay-mockup></login-overlay-mockup>`;
  }
}
