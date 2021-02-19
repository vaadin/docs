import { LitElement, html, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

@customElement('routing-login')
export class LoginView extends LitElement {
  render() {
    return html`
      <vaadin-vertical-layout style="width: 15em">
        <vaadin-form-layout>
          <vaadin-text-field label="Username" clear-button-visible> </vaadin-text-field>
          <vaadin-password-field label="Password" clear-button-visible> </vaadin-password-field>
        </vaadin-form-layout>

        <a href="routing-registration">Register</a>
      </vaadin-vertical-layout>
    `;
  }
}
