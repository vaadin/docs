import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-login/vaadin-login-form';
import { applyTheme } from 'generated/theme';

@customElement('login-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      :host {
        display: flex !important;
        justify-content: center;
        background-color: var(--lumo-contrast-5pct);
        padding: var(--lumo-space-m);
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-login-form></vaadin-login-form>
      <!-- end::snippet[] -->
    `;
  }
}
