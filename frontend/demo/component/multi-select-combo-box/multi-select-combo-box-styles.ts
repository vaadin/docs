import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/multi-select-combo-box';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('multi-select-combo-box-styles')
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
        <vaadin-multi-select-combo-box theme="align-right small helper-above-field"
          label="Label" helper-text="Helper text"
          .items="${['Value']}" value="Value">
        </vaadin-multi-select-combo-box>
        <!-- end::snippet[] -->
    `;
  }
}
