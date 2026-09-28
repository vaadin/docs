import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/form-layout';
import '@vaadin/text-field';
import '@vaadin/email-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('form-layout-label-styling')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    // tag::snippet[]
    return html`
      <vaadin-form-layout
        auto-responsive
        labels-aside
        style="
          --vaadin-form-layout-label-width: 10em;
          --vaadin-form-layout-label-spacing: 2em;
          --vaadin-form-layout-label-text-align: end;
        "
      >
        <vaadin-text-field label="First name"></vaadin-text-field>
        <vaadin-text-field label="Last name"></vaadin-text-field>
        <vaadin-email-field label="Email address"></vaadin-email-field>
      </vaadin-form-layout>
    `;
    // end::snippet[]
  }
}
