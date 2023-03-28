import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/multi-select-combo-box';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('multi-select-combo-box-readonly-and-disabled')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-multi-select-combo-box readonly label="Read-only"
          .items="${['Value']}" value="Value">
        </vaadin-multi-select-combo-box>

        <vaadin-multi-select-combo-box disabled label="Disabled">
        </vaadin-multi-select-combo-box>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
