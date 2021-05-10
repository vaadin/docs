import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('email-field-basic')
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
        <vaadin-email-field
          label="Email address"
          name="email"
          value="julia.scheider@email.com"
          error-message="Please enter a valid email address"
          clear-button-visible
        ></vaadin-email-field>

        <vaadin-email-field
          label="Email address"
          name="email"
          value="This is not an email"
          error-message="Please enter a valid email address"
          clear-button-visible
          invalid
        ></vaadin-email-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }
}
