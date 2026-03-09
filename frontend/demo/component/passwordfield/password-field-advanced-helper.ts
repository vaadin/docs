import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/password-field';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { PasswordFieldValueChangedEvent } from '@vaadin/password-field';
import { applyTheme } from 'Frontend/demo/theme';

type PasswordStrength = 'moderate' | 'strong' | 'weak';

@customElement('password-field-advanced-helper')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  private pattern = '^(?=.*[0-9])(?=.*[a-zA-Z]).{8}.*$';

  @state()
  private password = '';

  protected override render() {
    let strength: PasswordStrength;
    if (this.password.length > 9) {
      strength = 'strong';
    } else if (this.password.length > 5) {
      strength = 'moderate';
    } else {
      strength = 'weak';
    }

    return html`
      <!-- tag::snippet[] -->
      <vaadin-password-field
        label="Password"
        .value="${this.password}"
        @value-changed="${this.onPasswordChanged}"
        pattern="${this.pattern}"
        error-message="Not a valid password"
        style="width: 14em"
      >
        <vaadin-icon
          icon="vaadin:check"
          slot="suffix"
          class="${strength}"
          ?hidden="${strength !== 'strong'}"
        ></vaadin-icon>

        <div slot="helper">
          Password strength:
          <span class="${strength}">${strength}</span>
        </div>
      </vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }

  private onPasswordChanged(event: PasswordFieldValueChangedEvent) {
    this.password = event.detail.value;
  }
}
