import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-text-field/vaadin-integer-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-stepper-min-max')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-integer-field
        label="Quantity"
        helper-text="Max 10 items"
        min="0"
        max="10"
        value="2"
        has-controls
      ></vaadin-integer-field>
      <!-- end::snippet[] -->
    `;
  }
}
