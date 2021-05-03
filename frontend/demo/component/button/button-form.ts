import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('button-form')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-vertical-layout theme="spacing">
        <vaadin-form-layout .responsiveSteps="${[{ columns: 2 }]}">
          <vaadin-text-field label="First name" value="John"></vaadin-text-field>
          <vaadin-text-field label="Last name" value="Smith"></vaadin-text-field>
          <vaadin-text-field
            label="Email address"
            value="john.smith@example.com"
            colspan="2"
          ></vaadin-text-field>
        </vaadin-form-layout>

        <vaadin-horizontal-layout theme="spacing">
          <vaadin-button theme="primary">Create account</vaadin-button>
          <vaadin-button theme="secondary">Cancel</vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
      <!-- end::snippet[] -->
    `;
  }
}
