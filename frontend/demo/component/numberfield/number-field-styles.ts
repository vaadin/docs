import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/number-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('number-field-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-number-field
        theme="align-right small helper-above-field"
        label="Label"
        helper-text="Helper text"
        value="123.45"
        style="--vaadin-input-field-border-width: 1px;"
      >
      </vaadin-number-field>
      <!-- end::snippet[] -->
    `;
  }
}
