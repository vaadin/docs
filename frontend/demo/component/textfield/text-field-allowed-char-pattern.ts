import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-field-allowed-char-pattern')
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
      <vaadin-text-field
        allowed-char-pattern="[\\d\\-+()]"
        label="Phone number"
        helper-text="Format: +(123)456-7890"
      ></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
