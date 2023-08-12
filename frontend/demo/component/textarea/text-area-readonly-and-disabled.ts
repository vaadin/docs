import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/text-area';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('text-area-readonly-and-disabled')
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
        <vaadin-text-area readonly label="Read-only" value="Value" style="width:100%">
        </vaadin-text-area>

        <vaadin-text-area disabled label="Disabled" style="width:100%"></vaadin-text-area>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
