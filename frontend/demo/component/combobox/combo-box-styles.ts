import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/combo-box';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('combo-box-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-combo-box
        theme="align-right small helper-above-field"
        label="Label"
        helper-text="Helper text"
        .items="${['Value']}"
        value="Value"
      >
      </vaadin-combo-box>
      <!-- end::snippet[] -->
    `;
  }
}
