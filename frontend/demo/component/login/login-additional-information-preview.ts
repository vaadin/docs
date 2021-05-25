import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import './login-overlay-mockup';
import { LoginOverlayMockupElement } from './login-overlay-mockup';

@customElement('login-additional-information')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('login-overlay-mockup')
  private login?: LoginOverlayMockupElement;
  firstUpdated() {
    if (this.login && this.login.i18n) {
      this.login.i18n = {
        ...this.login.i18n,
        additionalInformation: `Please, contact admin@company.com if you're experiecing issues logging into your account`,
      };
    }
  }

  render() {
    return html`<login-overlay-mockup></login-overlay-mockup>`;
  }
}
