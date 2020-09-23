import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, property, css } from 'lit-element';
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

@customElement('password-field-advanced-helper')
export class Example extends LitElement {
  @property() strengthText: StrengthText = StrengthText.weak;
  @property() strengthColor: StrengthColor = StrengthColor.weak;
  pattern = '^(?=.*[0-9])(?=.*[a-zA-Z]).{8}.*$';

  static get styles() {
    return css`
      .note {
        color: var(--lumo-primary-text-color);
        background-color: var(--lumo-primary-color-10pct);
        border-radius: var(--lumo-border-radius);
        margin-bottom: 0;
        padding: var(--lumo-space-s);
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-password-field
        label="Password"
        @value-changed="${this.onPasswordChanged}"
        pattern="${this.pattern}"
        error-message="Not a valid password"
      >
        <iron-icon
          icon="lumo:checkmark"
          slot="suffix"
          style="color:${StrengthColor.strong}"
          ?hidden="${this.strengthText !== StrengthText.strong}"
        ></iron-icon>
        <div slot="helper">
          Password strength:
          <span style="color:${this.strengthColor}">${this.strengthText}</span>
          <p class="note">
            A password must be at least 8 characters. It has to have at least one letter and one
            digit.
          </p>
        </div>
      </vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }

  private onPasswordChanged(e: CustomEvent) {
    const value = e.detail.value;
    let strength: StrengthText = StrengthText.weak;
    if (value && new RegExp(this.pattern).exec(value)) {
      if (value.length > 9) strength = StrengthText.strong;
      else if (value.length > 5) strength = StrengthText.moderate;
    }
    this.strengthText = strength;
    this.strengthColor = StrengthColor[strength];
  }
}
