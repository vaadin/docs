import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/text-area';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('text-area-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-area
        theme="align-right small helper-above-field"
        label="Label"
        helper-text="Helper text"
        value="Value"
        style="width: 100%;"
      ></vaadin-text-area>
      <!-- end::snippet[] -->
    `;
  }
}
