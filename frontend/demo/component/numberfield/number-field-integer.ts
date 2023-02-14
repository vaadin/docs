import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/integer-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('number-field-integer')
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
        <vaadin-integer-field label="X" value="-1284"></vaadin-integer-field>

        <vaadin-integer-field label="Y" value="3910"></vaadin-integer-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
