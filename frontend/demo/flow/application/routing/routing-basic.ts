import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/form-layout';
import '@vaadin/password-field';
import '@vaadin/text-field';
import '@vaadin/vertical-layout';

@customElement('routing-login')
export class LoginView extends LitElement {
  render() {
    return html`
      <vaadin-vertical-layout style="width: 15em">
        <vaadin-form-layout>
          <vaadin-text-field label="Username" clear-button-visible></vaadin-text-field>
          <vaadin-password-field label="Password" clear-button-visible></vaadin-password-field>
        </vaadin-form-layout>

        <a href="routing-registration">Register</a>
      </vaadin-vertical-layout>
    `;
  }
}
