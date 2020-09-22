import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property, css } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-lumo-styles/icons';
import '@polymer/iron-icon';

type PasswordStrength = 'weak' | 'moderate' | 'strong';

@customElement('input-field-helper')
export class Example extends LitElement {
  @property() strength: PasswordStrength = 'weak';

  static get styles() {
    return css`
      .weak-color {
        color: var(--lumo-error-text-color);
      }
      .moderate-color {
        color: #e7c200;
      }
      .strong-color {
        color: var(--lumo-success-color);
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-text-field
        label="Phone number"
        pattern="^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$"
        maxlength="22"
        error-message="Not a valid phone number"
        helper-text="Include country and area prefixes"
      >
      </vaadin-text-field>
      <vaadin-password-field
        label="Password"
        @value-changed="${this.onPasswordChanged}"
        reveal-button-hidden
      >
        <iron-icon
          icon="lumo:checkmark"
          slot="suffix"
          class="strong-color"
          ?hidden="${this.strength !== 'strong'}"
        ></iron-icon>
        <div slot="helper">
          Password strength:
          <span class="${this.strength}-color">${this.strength}</span>
        </div>
      </vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }

  private onPasswordChanged(e: CustomEvent) {
    let strength: PasswordStrength = 'weak';
    if (e.detail.value) {
      if (e.detail.value.length > 9) strength = 'strong';
      else if (e.detail.value.length > 5) strength = 'moderate';
    }
    this.strength = strength;
  }
}
