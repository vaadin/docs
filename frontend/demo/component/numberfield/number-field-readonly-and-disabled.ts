import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/number-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-readonly-and-disabled')
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
        <vaadin-number-field readonly label="Read-only" value="200">
        </vaadin-number-field>

        <vaadin-number-field disabled label="Disabled">
        </vaadin-number-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
