import { customElement, html, internalProperty, LitElement } from 'lit-element';
import { LoginResult } from '@vaadin/flow-frontend';
import { login } from './auth';
import { Router } from '@vaadin/router';
import '@vaadin/vaadin-login/vaadin-login-overlay';

@customElement('login-view')
export class LoginView extends LitElement {
  @internalProperty()
  private error = false;

  private onSuccess = (result: LoginResult) => {
    Router.go(result.redirectUrl!);
  };

  render() {
    return html`
      <vaadin-login-overlay opened .error="${this.error}" @login="${this.login}">
      </vaadin-login-overlay>
    `;
  }

  async login(event: CustomEvent): Promise<LoginResult> {
    this.error = false;
    // use the login helper method from auth.ts, which in turn uses
    // Vaadin provided login helper method to obtain the LoginResult
    const result = await login(event.detail.username, event.detail.password);
    this.error = result.error;

    if (!result.error) {
      this.onSuccess(result);
    }

    return result;
  }
}
