import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/time-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('time-picker-styles')
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
      <vaadin-time-picker
        theme="align-right small helper-above-field"
        label="Label"
        helper-text="Helper text"
        value="07:00"
        style="--vaadin-input-field-border-width: 1px;"
      ></vaadin-time-picker>
      <!-- end::snippet[] -->
    `;
  }
}
