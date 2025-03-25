import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/form-layout';
import '@vaadin/form-layout/vaadin-form-row.js';
import '@vaadin/password-field';
import '@vaadin/text-field';
import '@vaadin/email-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('form-layout-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  protected override render() {
    return html`
      <vaadin-form-layout auto-responsive>
        <vaadin-form-row>
          <vaadin-text-field label="First name"></vaadin-text-field>
          <vaadin-text-field label="Last name"></vaadin-text-field>
        </vaadin-form-row>
        <vaadin-form-row>
          <vaadin-email-field label="Email"></vaadin-email-field>
        </vaadin-form-row>
        <vaadin-form-row>
          <vaadin-password-field label="Password"></vaadin-password-field>
          <vaadin-password-field label="Confirm password"></vaadin-password-field>
        </vaadin-form-row>
      </vaadin-form-layout>
    `;
  }
  // end::snippet[]
}
