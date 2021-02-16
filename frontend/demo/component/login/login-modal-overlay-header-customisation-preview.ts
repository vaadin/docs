import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import { applyTheme } from 'themes/theme-generated.js';
import './login-overlay-mockup';
import * as img from '../../../../src/main/resources/images/logo-white.png';

@customElement('login-modal-overlay-header-customisation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      .title {
        color: var(--lumo-primary-contrast-color);
        font-weight: 600;
        font-size: var(--lumo-size-m);
        margin-top: var(--lumo-space-m);
        margin-bottom: var(--lumo-space-xs);
      }

      span {
        color: var(--lumo-primary-contrast-color);
      }

      a {
        color: var(--lumo-primary-contrast-color);
      }
    `;
  }

  render() {
    return html`
      <login-overlay-mockup theme="header-customised" opened description="">
        <img slot="title" src=${img} width="100" />
        <h2 slot="title" class="title">Welcome back</h2>
        <span slot="title">Don't have an account? <a href="#">Sign up here!</a></span>
      </login-overlay-mockup>
    `;
  }
}
