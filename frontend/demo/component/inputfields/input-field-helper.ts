import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/password-field';
import '@vaadin/text-field';
import type { PasswordFieldValueChangedEvent } from '@vaadin/password-field';
import { applyTheme } from 'Frontend/generated/theme';

type PasswordStrength = 'moderate' | 'strong' | 'weak';

const StrengthColor: Record<PasswordStrength, string> = {
  weak: 'var(--lumo-error-color)',
  moderate: '#e7c200',
  strong: 'var(--lumo-success-color)',
};

@customElement('input-field-helper')
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

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <!-- tag::snippet[] -->
        <vaadin-text-field
          label="Phone number"
          helper-text="Include country and area prefixes"
        ></vaadin-text-field>

        <vaadin-password-field
          label="Password"
          @value-changed="${this.onPasswordChanged}"
          reveal-button-hidden
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
      </vaadin-horizontal-layout>
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
