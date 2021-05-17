import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-login/vaadin-login-overlay';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-overlay-header')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-login-overlay
        title="TaskMob"
        description="Built with ♥ by Vaadin"
        opened
      ></vaadin-login-overlay>
      <!-- end::snippet[] -->
    `;
  }
}
