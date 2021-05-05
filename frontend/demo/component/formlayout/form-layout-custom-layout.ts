import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';

import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import { applyTheme } from 'Frontend/generated/theme';
import { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout/vaadin-form-layout';

@customElement('form-layout-custom-layout')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: '10em', columns: 2 },
    { minWidth: '20em', columns: 3 },
  ];

  render() {
    return html`
      <vaadin-split-layout>
        <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
          <vaadin-text-field label="First name"></vaadin-text-field>
          <vaadin-text-field label="Last name"></vaadin-text-field>
          <vaadin-email-field label="Email"></vaadin-email-field>
        </vaadin-form-layout>
        <div></div>
      </vaadin-split-layout>
    `;
  }
  // end::snippet[]
}
