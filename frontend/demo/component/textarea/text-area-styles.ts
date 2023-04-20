import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/text-area';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-area-styles')
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
        <vaadin-text-area theme="align-right small helper-above-field"
          label="Label" helper-text="Helper text" value="Value"
          style="width:100%">
        </vaadin-text-area>
        <!-- end::snippet[] -->
    `;
  }
}
