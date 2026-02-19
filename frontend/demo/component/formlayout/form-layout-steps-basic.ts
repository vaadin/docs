import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/email-field';
import '@vaadin/form-layout';
import '@vaadin/split-layout';
import '@vaadin/text-field';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { FormLayoutResponsiveStep } from '@vaadin/form-layout';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('form-layout-steps-basic')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-split-layout>
        ${this.renderFormLayout()}
        <div></div>
      </vaadin-split-layout>
    `;
  }

  // tag::snippet[]
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    // Use two columns, if the layout's width exceeds 320px
    { minWidth: '320px', columns: 2 },
    // Use three columns, if the layout's width exceeds 500px
    { minWidth: '500px', columns: 3 },
  ];

  // end::snippet[]
  // tag::snippet[]
  private renderFormLayout() {
    return html`
      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-text-field label="First name"></vaadin-text-field>
        <vaadin-text-field label="Last name"></vaadin-text-field>
        <vaadin-email-field label="Email address"></vaadin-email-field>
      </vaadin-form-layout>
    `;
  }
  // end::snippet[]
}
