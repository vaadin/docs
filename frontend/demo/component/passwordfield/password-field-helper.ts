import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('input-field-helper')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-password-field
        label="Password"
        helper-text="A password must be at least 8 characters.
          It has to have at least one letter and one digit."
        pattern="^(?=.*[0-9])(?=.*[a-zA-Z]).{8}.*$"
        error-message="Not a valid password"
      >
      </vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }
}
