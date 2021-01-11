import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-date-picker';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('input-field-required')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
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
