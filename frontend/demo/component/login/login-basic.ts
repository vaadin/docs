import 'Frontend/demo/init'; // hidden-source-line
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-login/vaadin-login-form';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  static get styles() {
    return css`
      :host {
        background-color: var(--lumo-contrast-5pct);
        display: flex !important;
        justify-content: center;
        padding: var(--lumo-space-l);
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- no-autofocus is used to prevent the example from stealing focus when browsing the documentation -->
      <vaadin-login-form no-autofocus></vaadin-login-form>
      <!-- end::snippet[] -->
    `;
  }
}
