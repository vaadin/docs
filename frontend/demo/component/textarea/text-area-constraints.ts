import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/text-area';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-area-constraints')
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
      <vaadin-text-area
        required
        min-length="5"
        max-length="50"
        pattern="^[A-Z]([A-Za-z0-9,-\s])*\.$"
        allowed-char-pattern="[A-Za-z0-9,.-\s]"
        label="Sentence"
        helper-text="Must be one complete sentence ending in a period, between 5 and 50 characters long"
        style="width:100%"
      ></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
