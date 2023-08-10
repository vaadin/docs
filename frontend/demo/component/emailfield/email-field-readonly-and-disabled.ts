import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/email-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('email-field-readonly-and-disabled')
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
        <vaadin-email-field readonly label="Read-only" value="example@example.com">
        </vaadin-email-field>

        <vaadin-email-field disabled label="Disabled"></vaadin-email-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
