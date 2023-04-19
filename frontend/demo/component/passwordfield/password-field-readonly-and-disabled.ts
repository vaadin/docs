import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/password-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('password-field-readonly-and-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-password-field readonly label="Read-only" value="Ex@mplePassw0rd">
        </vaadin-password-field>

        <vaadin-password-field disabled label="Disabled">
        </vaadin-password-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
