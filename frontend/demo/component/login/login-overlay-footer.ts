import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/login';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-overlay-footer')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- no-autofocus is used to prevent the example from stealing focus when browsing the documentation -->
      <vaadin-login-overlay opened no-autofocus>
        <p slot="footer" class="text-center">Never tell your password to anyone</p>
      </vaadin-login-overlay>
      <!-- end::snippet[] -->
    `;
  }
}
