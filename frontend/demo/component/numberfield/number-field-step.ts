import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-number-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-step')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-number-field
        label="Duration (hours)"
        step="0.5"
        value="12.5"
        has-controls
      ></vaadin-number-field>
      <!-- end::snippet[] -->
    `;
  }
}
