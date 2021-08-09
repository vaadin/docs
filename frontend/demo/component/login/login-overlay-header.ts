import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-login/vaadin-login-overlay';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-overlay-header')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- no-autofocus is used to prevent the example from stealing focus when browsing the documentation -->
      <vaadin-login-overlay
        title="TaskMob"
        description="Built with ♥ by Vaadin"
        opened
        no-autofocus
      ></vaadin-login-overlay>
      <!-- end::snippet[] -->
    `;
  }
}
