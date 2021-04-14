import 'Frontend/demo/init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import { applyTheme } from 'Frontend/generated/theme';
import { FormLayoutElement } from '@vaadin/vaadin-form-layout/vaadin-form-layout';

@customElement('button-dialog')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-form-layout>
        <vaadin-text-field label="First name" value="John"></vaadin-text-field>
        <vaadin-text-field label="Last name" value="Smith"></vaadin-text-field>
        <vaadin-text-field
          label="Email address"
          value="john.smith@examples.com"
          colspan="2"
        ></vaadin-text-field>
      </vaadin-form-layout>
      <div style="margin-top: 1rem;">
        <vaadin-button theme="secondary error">Cancel</vaadin-button>
        <vaadin-horizontal-layout theme="spacing" style="float: right;">
          <vaadin-button theme="secondary">Cancel</vaadin-button>
          <vaadin-button theme="primary">Create account</vaadin-button>
        </vaadin-horizontal-layout>
      </div>
      <!-- end::snippet[] -->
    `;
  }

  firstUpdated() {
    const formLayout = this.shadowRoot?.querySelector('vaadin-form-layout') as FormLayoutElement;
    formLayout.responsiveSteps = [{ columns: 2 }];
  }
}
