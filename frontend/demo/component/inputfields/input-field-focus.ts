import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/form-layout';
import '@vaadin/password-field';
import '@vaadin/text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('input-field-focus')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  steps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '30em', columns: 2 },
  ];

  protected override render() {
    return html`
      <vaadin-form-layout .responsiveSteps="${this.steps}">
        <!-- tag::snippet[] -->
        <vaadin-text-field label="First name"></vaadin-text-field>
        <vaadin-text-field label="Last name"></vaadin-text-field>
        <vaadin-text-field label="Username" colspan="2"></vaadin-text-field>
        <vaadin-password-field label="Password"></vaadin-password-field>
        <vaadin-password-field label="Confirm password"></vaadin-password-field>
        <!-- end::snippet[] -->
      </vaadin-form-layout>
    `;
  }
}
