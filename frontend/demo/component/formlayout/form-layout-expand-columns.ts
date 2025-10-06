import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/form-layout';
import '@vaadin/form-layout/vaadin-form-row.js';
import '@vaadin/password-field';
import '@vaadin/text-field';
import '@vaadin/email-field';
import '@vaadin/split-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('form-layout-expand-columns')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-split-layout>
        ${this.renderFormLayout()}
        <div></div>
      </vaadin-split-layout>
    `;
  }

  private renderFormLayout() {
    // tag::snippet[]
    return html`
      <vaadin-form-layout class="w-full" auto-responsive column-width="8em" expand-columns>
        <vaadin-form-row>
          <vaadin-text-field label="First name"></vaadin-text-field>
          <vaadin-text-field label="Last name"></vaadin-text-field>
        </vaadin-form-row>
        <vaadin-form-row>
          <vaadin-email-field label="Email address"></vaadin-email-field>
        </vaadin-form-row>
        <vaadin-form-row>
          <vaadin-password-field label="Password"></vaadin-password-field>
          <vaadin-password-field label="Confirm password"></vaadin-password-field>
        </vaadin-form-row>
      </vaadin-form-layout>
    `;
    // end::snippet[]
  }
}
