import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('input-field-helper-position')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field
        label="Phone number"
        helper-text="Include country and area prefixes"
        theme="helper-above-field"
        style="width: 15em;"
      ></vaadin-text-field>
      <!-- end::snippet[] -->
    `;
  }
}
