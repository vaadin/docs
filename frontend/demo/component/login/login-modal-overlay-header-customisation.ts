import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-login/vaadin-login-overlay';
import { applyTheme } from 'generated/theme';
import * as img from '../../../../src/main/resources/images/logo-white.png';

@customElement('login-modal-overlay-header-customisation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-login-overlay theme="header-customised" opened description="">
        <img slot="title" src=${img} width="100" />
        <h2 slot="title" class="title">Welcome back</h2>
        <span slot="title">Don't have an account? <a href="#">Sign up here!</a></span>
      </vaadin-login-overlay>
      <!-- end::snippet[] -->
    `;
  }
}
