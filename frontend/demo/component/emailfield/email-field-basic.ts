import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/email-field';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('email-field-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: baseline">
        <!-- tag::snippet[] -->
        <vaadin-email-field
          label="Email address"
          name="email"
          value="julia.scheider@email.com"
          error-message="Enter a valid email address"
          clear-button-visible
        ></vaadin-email-field>

        <vaadin-email-field
          label="Email address"
          name="email"
          value="This is not an email"
          error-message="Enter a valid email address"
          clear-button-visible
          invalid
        ></vaadin-email-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
