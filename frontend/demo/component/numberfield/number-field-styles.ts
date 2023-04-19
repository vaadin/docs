import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/number-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-styles')
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
        <vaadin-number-field theme="align-right small helper-above-field"
          label="Label" helper-text="Helper text" value="123.45">
        </vaadin-number-field>
        <!-- end::snippet[] -->
    `;
  }
}
