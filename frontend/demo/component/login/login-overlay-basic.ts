import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-login/vaadin-login-overlay';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-overlay-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private loginOpened = false;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-button @click="${() => (this.loginOpened = true)}" theme="primary">
        Log in
      </vaadin-button>
      <vaadin-login-overlay
        .opened="${this.loginOpened}"
        @login="${() => (this.loginOpened = false)}"
      ></vaadin-login-overlay>
      <!-- end::snippet[] -->
    `;
  }
}
