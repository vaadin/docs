import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/password-field';
import type { PasswordFieldValueChangedEvent } from '@vaadin/password-field';
import { applyTheme } from 'Frontend/generated/theme';

type PasswordStrength = 'moderate' | 'strong' | 'weak';

const StrengthColor: Record<PasswordStrength, string> = {
  weak: 'var(--lumo-error-color)',
  moderate: '#e7c200',
  strong: 'var(--lumo-success-color)',
};

@customElement('password-field-advanced-helper')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private strengthText: PasswordStrength = 'weak';

  @state()
  private strengthColor = StrengthColor.weak;

  private pattern = '^(?=.*[0-9])(?=.*[a-zA-Z]).{8}.*$';

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-password-field
        label="Password"
        @value-changed="${this.onPasswordChanged}"
        pattern="${this.pattern}"
        error-message="Not a valid password"
      >
        <vaadin-icon
          icon="vaadin:check"
          slot="suffix"
          style="color:${StrengthColor.strong}"
          ?hidden="${this.strengthText !== 'strong'}"
        ></vaadin-icon>
        <div slot="helper">
          Password strength:
          <span style="color:${this.strengthColor}">${this.strengthText}</span>
        </div>
      </vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }

  private onPasswordChanged(event: PasswordFieldValueChangedEvent) {
    let strength: PasswordStrength = 'weak';
    const { value } = event.detail;
    if (value) {
      if (value.length > 9) {
        strength = 'strong';
      } else if (value.length > 5) {
        strength = 'moderate';
      }
    }
    this.strengthText = strength;
    this.strengthColor = StrengthColor[strength];
  }
}
