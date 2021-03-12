import { customElement, LitElement, html, css, unsafeCSS, property } from 'lit-element';
import { applyTheme } from 'generated/theme';
import '@vaadin/vaadin-login/vaadin-login-form';
import { LoginI18n } from '@vaadin/vaadin-login';

import * as img from '../../../../src/main/resources/images/starry-sky.png';

@customElement('login-overlay-mockup')
export class LoginOverlayMockupElement extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        height: 620px;
        overflow: auto;
      }
      [part='backdrop'] {
        background-color: var(--lumo-shade-20pct);
        background: var(--lumo-base-color)
          linear-gradient(var(--lumo-shade-5pct), var(--lumo-shade-5pct));
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        height: min-content;
      }
      [part='card'] {
        border-radius: var(--lumo-border-radius);
        box-shadow: var(--lumo-box-shadow-s);
        margin: var(--lumo-space-s);
        height: max-content;
        width: calc(var(--lumo-size-m) * 10);
        background: var(--lumo-base-color)
          linear-gradient(var(--lumo-tint-5pct), var(--lumo-tint-5pct));
        max-width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      [part='brand'] {
        padding: var(--lumo-space-l) var(--lumo-space-xl) var(--lumo-space-l) var(--lumo-space-l);
        background-color: var(--lumo-primary-color);
        color: var(--lumo-primary-contrast-color);
        min-height: calc(var(--lumo-size-m) * 5);
        box-sizing: border-box;
        overflow: hidden;
        flex-grow: 1;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      [part='brand'] h1 {
        color: inherit;
        margin: 0;
        font-size: var(--lumo-font-size-xxxl);
        font-weight: 500;
        line-height: var(--lumo-line-height-xs);
        font-family: var(--lumo-font-family);
      }
      [part='description'] {
        line-height: var(--lumo-line-height-s);
        color: var(--lumo-tint-70pct);
        margin-bottom: 0;
        margin-top: 0.5em;
      }

      :host([theme='header-customised']) [part='brand'] {
        background-size: cover;
        background-position: center;
        background-image: url(${unsafeCSS(img)});
      }
    `;
  }

  @property({ type: String })
  public headerTitle: string | undefined = 'App name';

  @property({ type: String })
  public description: string | undefined = 'Application description';

  @property({ type: Boolean })
  public error = false;

  @property({ type: Object })
  public i18n: LoginI18n = {
    form: {
      title: 'Log in',
      username: 'Username',
      password: 'Password',
      submit: 'Log in',
      forgotPassword: 'Forgot password'
    },
    errorMessage: {
      title: 'Incorrect username or password',
      message: 'Check that you have entered the correct username and password and try again.'
    }
  };

  render() {
    return html`
      <div part="backdrop">
        <section part="card">
          <div part="brand">
            <slot name="title">
              <h1 part="title">${this.headerTitle}</h1>
            </slot>
            <p part="description">${this.description}</p>
          </div>
          <div part="form">
            <vaadin-login-form .error=${this.error} .i18n=${this.i18n}></vaadin-login-form>
          </div>
        </section>
      </div>
    `;
  }
}
