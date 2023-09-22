import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/integer-field';
import './login-overlay-mockup';

@customElement('login-overlay-custom-form-area')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <login-overlay-mockup>
        <vaadin-integer-field
          slot="custom-form-area"
          name="code"
          label="One-time code"
        ></vaadin-integer-field>
      </login-overlay-mockup>
    `;
  }
}
