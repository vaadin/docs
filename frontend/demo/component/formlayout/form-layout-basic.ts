import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import { applyTheme } from 'Frontend/generated/theme';
import { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout/vaadin-form-layout';

@customElement('form-layout-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    // Use two columns, if layout's width exceeds 500px
    { minWidth: '500px', columns: 2 },
  ];

  render() {
    return html`
      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-text-field label="First name"></vaadin-text-field>
        <vaadin-text-field label="Last name"></vaadin-text-field>
        <!-- Stretch the username field over 2 columns -->
        <vaadin-text-field colspan="2" label="Username"></vaadin-text-field>
        <vaadin-password-field label="Password"> </vaadin-password-field>
        <vaadin-password-field label="Confirm password"> </vaadin-password-field>
      </vaadin-form-layout>
    `;
  }
  // end::snippet[]
}
