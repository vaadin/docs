import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/date-picker';
import '@vaadin/horizontal-layout';
import '@vaadin/text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('input-field-required')
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
        <vaadin-text-field
          label="Name"
          required
          error-message="This field is required"
        ></vaadin-text-field>
        <vaadin-date-picker label="Date of birth"></vaadin-date-picker>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
