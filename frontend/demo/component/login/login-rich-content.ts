import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css, unsafeCSS } from 'lit-element';
import { applyTheme } from 'generated/theme';
import '@vaadin/vaadin-login/vaadin-login-form';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import * as img from '../../../../src/main/resources/images/earth.jpg';

@customElement('login-rich-content')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  //tag::snippet[]
  static get styles() {
    return css`
      :host {
        height: 500px;
      }

      .container {
        display: flex;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-image: url(${unsafeCSS(img)});
      }

      .login-container {
        display: flex;
        align-items: center;
        max-width: 300px;
        background: hsl(214, 35%, 21%)
          linear-gradient(hsla(214, 65%, 85%, 0.06), hsla(214, 65%, 85%, 0.06));
      }

      vaadin-login-form {
        --lumo-base-color: hsl(214, 35%, 21%);
        --lumo-body-text-color: var(--lumo-contrast-90pct);
        --lumo-error-text-color: hsl(3, 100%, 67%);
        --lumo-header-text-color: var(--lumo-contrast);
        --lumo-primary-text-color: hsl(214, 100%, 70%);
        --lumo-secondary-text-color: var(--lumo-contrast-70pct);
        --lumo-error-color-10pct: hsla(3, 90%, 63%, 0.1);
        --lumo-primary-color: hsl(214, 86%, 55%);
        --lumo-primary-contrast-color: #fff;
        --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);

        --lumo-contrast: var(--lumo-tint);
        --lumo-contrast-10pct: var(--lumo-tint-10pct);
        --lumo-contrast-60pct: var(--lumo-tint-60pct);
        --lumo-contrast-70pct: var(--lumo-tint-70pct);
        --lumo-contrast-90pct: var(--lumo-tint-90pct);

        --lumo-tint: hsl(214, 100%, 98%);
        --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
        --lumo-tint-60pct: hsla(214, 82%, 90%, 0.6);
        --lumo-tint-70pct: hsla(214, 87%, 92%, 0.7);
        --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
      }
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="login-container">
          <vaadin-login-form></vaadin-login-form>
        </div>
      </div>
    `;
  }
  //end::snippet[]
}
