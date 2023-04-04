import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/number-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-step')
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
      <vaadin-number-field
        label="Duration (hours)"
        step="0.5"
        value="12.5"
        step-buttons-visible
      ></vaadin-number-field>
      <!-- end::snippet[] -->
    `;
  }
}
