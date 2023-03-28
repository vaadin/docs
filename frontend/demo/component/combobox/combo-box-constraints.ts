import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/combo-box';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('combo-box-constraints')
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
          allow-custom-value
          .items="${['DE','FI','US']}">
        </vaadin-combo-box>
        <!-- end::snippet[] -->
    `;
  }

}
