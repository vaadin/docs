import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-date-picker';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('input-field-required')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-text-field
          label="Name"
          required
          error-message="This field is required"
        ></vaadin-text-field>
        <vaadin-date-picker label="Date of birth"></vaadin-date-picker>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
