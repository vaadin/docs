import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/email-field';
import '@vaadin/form-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('email-field-readonly-and-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-form-layout auto-responsive auto-rows>
        <!-- tag::snippet[] -->
        <vaadin-email-field
          readonly
          label="Read-only"
          value="example@example.com"
        ></vaadin-email-field>

        <vaadin-email-field disabled label="Disabled"></vaadin-email-field>
        <!-- end::snippet[] -->
      </vaadin-form-layout>
    `;
  }
}
