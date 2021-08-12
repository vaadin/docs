import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-login/vaadin-login-form';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-rich-content')
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
      <!-- See login-rich-content.css -->
      <!-- no-autofocus is used to prevent the example from stealing focus when browsing the documentation -->
      <div class="login-rich-content">
        <vaadin-login-form theme="dark" no-autofocus></vaadin-login-form>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
