import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-text-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('input-field-focus')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  steps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '30em', columns: 2 },
  ];

  render() {
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
