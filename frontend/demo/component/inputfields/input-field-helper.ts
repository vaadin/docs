import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property, query, css } from 'lit-element';
import { PasswordFieldElement } from '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-lumo-styles/icons';
import '@polymer/iron-icon';

@customElement('input-field-helper')
export class Example extends LitElement {
  @property() strength: String = 'weak';
  @property() isStrong: boolean = false;
  @query('vaadin-password-field') passwordField?: PasswordFieldElement;

  static get styles() {
    return css`
      .weak {
        color: var(--lumo-error-color);
      }
      .moderate {
        color: #e7c200;
      }
      .strong {
        color: var(--lumo-success-color);
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field
        pattern="^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$"
        maxlength="22"
        label="Phone number"
        error-message="Not a valid phone number"
        helper-text="Include country and area prefixes"
      >
      </vaadin-text-field>
      <vaadin-password-field label="Password" @input="${this._onInput}" reveal-button-hidden>
        <div slot="suffix" ?hidden=${!this.isStrong}>
          <iron-icon icon="lumo:checkmark" slot="prefix" class="strong"></iron-icon>
        </div>
        <div slot="helper">
          Password strength:
          <span class="${this.strength}">${this.strength}</span>
        </div>
      </vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }

  _onInput() {
    let strength = 'weak';
    if (this.passwordField?.value) {
      const length = this.passwordField.value.length;
      if ((this.isStrong = length > 9)) strength = 'strong';
      else if (length > 5) strength = 'moderate';
    }
    this.strength = strength;
  }
}
