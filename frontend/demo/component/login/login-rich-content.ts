import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-login/vaadin-login-form';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-rich-content')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- See login-rich-content.css -->
      <div class="login-rich-content">
        <vaadin-login-form theme="dark"></vaadin-login-form>
      </div>
      <!-- end::snippet[] -->
    `;
  }
}
