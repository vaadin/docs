import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/login/vaadin-login-form.js';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { LoginFormDisabledChangedEvent } from '@vaadin/react-components';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('login-event')
export class Example extends LitElement {
  @state()
  private disabled = false;

  static override styles = css`
    :host {
      display: flex !important;
      justify-content: center;
    }
  `;

  _onDisabledChanged(event: LoginFormDisabledChangedEvent) {
    this.disabled = event.detail.value;
  }

  private onLogin() {
    setTimeout(() => {
      this.disabled = false; // Re-enable login button
    }, 1000);
  }

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- no-autofocus is used to prevent the example from stealing focus when browsing the documentation -->
      <vaadin-login-form
        no-autofocus
        @login=${this.onLogin}
        .disabled=${this.disabled}
        @disabled-changed=${this._onDisabledChanged}
      ></vaadin-login-form>
      <!-- end::snippet[] -->
    `;
  }
}
