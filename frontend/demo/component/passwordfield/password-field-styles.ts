import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/password-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('password-field-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-password-field
        theme="align-right small helper-above-field"
        label="Label"
        helper-text="Helper text"
        value="Ex@mplePassw0rd"
        style="--vaadin-input-field-border-width: 1px;"
      ></vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }
}
