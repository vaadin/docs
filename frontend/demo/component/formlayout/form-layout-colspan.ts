import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';

import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-time-picker/vaadin-time-picker';
import { applyTheme } from 'Frontend/generated/theme';
import { FormLayoutResponsiveStep } from '@vaadin/vaadin-form-layout/vaadin-form-layout';

@customElement('form-layout-custom-layout')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: '20em', columns: 3 },
  ];

  render() {
    return html`
      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <!-- tag::snippet[] -->
        <vaadin-text-field label="Title" colspan="3"></vaadin-text-field>
        <!-- end::snippet[] -->
        <vaadin-date-picker label="Date"></vaadin-date-picker>
        <vaadin-time-picker label="From"></vaadin-time-picker>
        <vaadin-time-picker label="To"></vaadin-time-picker>
      </vaadin-form-layout>
    `;
  }
}
