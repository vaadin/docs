import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';

import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import { applyTheme } from 'Frontend/generated/theme';
import { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout/vaadin-form-layout';

@customElement('form-layout-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: '20em', columns: 2 },
  ];

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-text-field colspan="1" label="First name"></vaadin-text-field>
        <vaadin-text-field colspan="1" label="Last name"></vaadin-text-field>
        <vaadin-text-field colspan="2" label="Username"></vaadin-text-field>
        <vaadin-password-field label="Password"> </vaadin-password-field>
        <vaadin-password-field label="Confirm password"> </vaadin-password-field>
      </vaadin-form-layout>
      <!-- end::snippet[] -->
    `;
  }
}
