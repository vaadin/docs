import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('text-field-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field
        theme="align-right small helper-above-field"
        label="Label"
        helper-text="Helper text"
        value="Value"
        style="--vaadin-input-field-border-width: 1px;"
      ></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
