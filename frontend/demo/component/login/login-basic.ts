import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/login/vaadin-login-form.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('login-basic')
export class Example extends LitElement {
  static override styles = css`
    :host {
      background-color: var(--lumo-contrast-5pct, rgba(0, 0, 0, 0.2));
      display: flex !important;
      justify-content: center;
      padding: var(--vaadin-padding-l);
    }

    vaadin-login-form {
      background-color: var(--vaadin-background-color);
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- no-autofocus is used to prevent the example from stealing focus when browsing the documentation -->
      <vaadin-login-form no-autofocus></vaadin-login-form>
      <!-- end::snippet[] -->
    `;
  }
}
