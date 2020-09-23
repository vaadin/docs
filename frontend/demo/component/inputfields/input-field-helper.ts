import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-lumo-styles/icons';
import '@polymer/iron-icon';

enum StrengthText {
  weak = 'weak',
  moderate = 'moderate',
  strong = 'strong'
}

enum StrengthColor {
  weak = 'var(--lumo-error-color)',
  moderate = '#e7c200',
  strong = 'var(--lumo-success-color)'
}

@customElement('input-field-helper')
export class Example extends LitElement {
  @property() strengthText: StrengthText = StrengthText.weak;
  @property() strengthColor: StrengthColor = StrengthColor.weak;

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
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
            style="color:${StrengthText.strong}"
            ?hidden="${this.strengthText !== StrengthText.strong}"
          ></iron-icon>
          <div slot="helper">
            Password strength:
            <span style="color:${this.strengthColor}">${this.strengthText}</span>
          </div>
        </vaadin-password-field>
        <!-- end::snippet[] -->
      </vaadin-horizontal-layout>
    `;
  }

  private onPasswordChanged(e: CustomEvent) {
    let strength: StrengthText = StrengthText.weak;
    if (e.detail.value) {
      if (e.detail.value.length > 9) strength = StrengthText.strong;
      else if (e.detail.value.length > 5) strength = StrengthText.moderate;
    }
    this.strengthText = strength;
    this.strengthColor = StrengthColor[strength];
  }
}
