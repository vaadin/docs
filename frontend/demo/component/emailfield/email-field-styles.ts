import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/email-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('email-field-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-email-field
        theme="align-right small helper-above-field"
        label="Label"
        helper-text="Helper text"
        value="foo@bar.com"
      ></vaadin-email-field>
      <!-- end::snippet[] -->
    `;
  }
}
