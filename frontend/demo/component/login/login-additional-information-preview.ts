import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement, query } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import './login-overlay-mockup';
import { LoginOverlayMockupElement } from './login-overlay-mockup';

@customElement('login-additional-information')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
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
