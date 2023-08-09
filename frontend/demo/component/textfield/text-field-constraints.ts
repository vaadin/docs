import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-field-constraints')
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
        required
        min-length="5"
        max-length="18"
        pattern="^[+]?[\\(]?[0-9]{3}[\\)]?[\\-s.]?[0-9]{3}[\\-s.]?[0-9]{4,6}$"
        allowed-char-pattern="[0-9()+-]"
        label="Phone number"
        helper-text="Format: +(123)456-7890"
      ></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
