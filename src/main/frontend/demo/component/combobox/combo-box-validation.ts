import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/combo-box';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('combo-box-validation')
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
      <vaadin-combo-box
        required
        allowed-char-pattern="[A-Z]"
        label="Country code"
        helper-text="2-letter uppercase ISO country code"
        error-message="Field is required"
        allow-custom-value
        .items="${['DE', 'FI', 'US']}"
      ></vaadin-combo-box>
      <!-- end::snippet[] -->
    `;
  }
}
