import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-integer-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-stepper-min-max')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
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
