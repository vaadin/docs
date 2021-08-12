import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/vaadin-login/vaadin-login-form';
import { LoginI18n } from '@vaadin/vaadin-login';
import * as img from '../../../../src/main/resources/images/starry-sky.png';

@customElement('login-overlay-mockup')
export class LoginOverlayMockupElement extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  static get styles() {
    return css`
      [part='backdrop'] {
        background: var(--lumo-base-color)
          linear-gradient(var(--lumo-shade-5pct), var(--lumo-shade-5pct));
        display: flex;
        justify-content: center;
        padding: var(--lumo-space-m);
      }

      [part='card'] {
        background: var(--lumo-base-color)
          linear-gradient(var(--lumo-tint-5pct), var(--lumo-tint-5pct));
        border-radius: var(--lumo-border-radius);
        box-shadow: var(--lumo-box-shadow-s);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin: var(--lumo-space-s);
        max-width: 100%;
        overflow: hidden;
        height: max-content;
        width: calc(var(--lumo-size-m) * 10);
      }

      [part='brand'] {
        background-color: var(--lumo-primary-color);
        box-sizing: border-box;
        color: var(--lumo-primary-contrast-color);
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        flex-shrink: 0;
        justify-content: flex-end;
        min-height: calc(var(--lumo-size-m) * 5);
        overflow: hidden;
        padding: var(--lumo-space-l) var(--lumo-space-xl) var(--lumo-space-l) var(--lumo-space-l);
      }

      [part='brand'] h1 {
        color: inherit;
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-xxxl);
        font-weight: 600;
        line-height: var(--lumo-line-height-xs);
        margin: 0;
      }

      [part='description'] {
        color: var(--lumo-tint-70pct);
        line-height: var(--lumo-line-height-s);
        margin-bottom: 0;
        margin-top: 0.5em;
      }

      :host([theme='header-customised']) [part='brand'] {
        background-image: url(${unsafeCSS(img)});
        background-position: center;
        background-size: cover;
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
      forgotPassword: 'Forgot password',
    },
    errorMessage: {
      title: 'Incorrect username or password',
      message: 'Check that you have entered the correct username and password and try again.',
    },
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
            <!-- no-autofocus is used to prevent the example from stealing focus when browsing the documentation -->
            <vaadin-login-form
              .error="${this.error}"
              .i18n="${this.i18n}"
              no-autofocus
            ></vaadin-login-form>
          </div>
        </section>
      </div>
    `;
  }
}
