import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/login/vaadin-login-form.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-rich-content')
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
      <!-- See login-rich-content.css -->
      <!-- no-autofocus is used to prevent the example from stealing focus when browsing the documentation -->
      <div class="login-rich-content">
        <vaadin-login-form theme="dark" no-autofocus></vaadin-login-form>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
