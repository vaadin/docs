import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/form-layout';
import '@vaadin/checkbox';
import '@vaadin/email-field';
import '@vaadin/password-field';
import '@vaadin/split-layout';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('form-layout-labels-aside')
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
      <vaadin-form-layout style="width: 100%" auto-responsive labels-aside>
        <vaadin-email-field label="Email"></vaadin-email-field>
        <vaadin-password-field label="Password"></vaadin-password-field>
        <vaadin-checkbox label="Subscribe"></vaadin-checkbox>
      </vaadin-form-layout>
    `;
    // end::snippet[]
  }
}
