import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/checkbox';
import '@vaadin/horizontal-layout';
import type { Checkbox } from '@vaadin/checkbox';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('checkbox-required')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @query('vaadin-checkbox')
  protected checkbox!: Checkbox;

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: baseline">
        <!-- tag::snippet[] -->
        <vaadin-checkbox
          label="I accept the terms and conditions"
          required
          error-message="This field is required"
        ></vaadin-checkbox>
        <!-- end::snippet[] -->
        <vaadin-button @click="${this.validate}">Submit</vaadin-button>
      </vaadin-horizontal-layout>
    `;
  }

  protected validate() {
    this.checkbox.validate();
  }
}
