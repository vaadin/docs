import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css, unsafeCSS } from 'lit-element';
import { applyTheme } from 'themes/theme-generated.js';
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
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="login-container">
          <vaadin-login-form theme="dark"></vaadin-login-form>
        </div>
      </div>
    `;
  }
  //end::snippet[]
}
