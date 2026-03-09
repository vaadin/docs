import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/login';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('login-overlay-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private loginOpened = false;

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button
        theme="primary"
        @click="${() => {
          this.loginOpened = true;
        }}"
      >
        Log in
      </vaadin-button>
      <vaadin-login-overlay
        .opened="${this.loginOpened}"
        @login="${() => {
          this.loginOpened = false;
        }}"
      ></vaadin-login-overlay>
      <!-- end::snippet[] -->
    `;
  }
}
