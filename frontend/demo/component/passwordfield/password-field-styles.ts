import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/password-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('password-field-styles')
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
        <vaadin-password-field theme="align-right small helper-above-field"
          label="Label" helper-text="Helper text" value="Ex@mplePassw0rd">
        </vaadin-password-field>
        <!-- end::snippet[] -->
    `;
  }
}
