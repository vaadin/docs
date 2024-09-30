import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/integer-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-validation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-integer-field
        label="Quantity"
        helper-text="Max 10 items"
        min="0"
        max="10"
        value="2"
        step-buttons-visible
      ></vaadin-integer-field>
      <!-- end::snippet[] -->
    `;
  }
}
