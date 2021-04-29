import { customElement, html, internalProperty, LitElement } from 'lit-element';
import { LoginResult } from '@vaadin/flow-frontend';
import { login } from './auth';
import { AfterEnterObserver, RouterLocation } from '@vaadin/router';
import '@vaadin/vaadin-login/vaadin-login-overlay';

@customElement('login-view')
export class LoginView extends LitElement implements AfterEnterObserver {
  @internalProperty()
  private error = false;

  // the url to redirect to after a successful login
  private returnUrl?: string;

  private onSuccess = (result: LoginResult) => {
    // If a login redirect was initiated by opening a protected URL, the server knows where to go (result.redirectUrl).
    // If a login redirect was initiated by the client router, this.returnUrl knows where to go.
    // If login was opened directly, use the default URL provided by the server.
    // As we do not know if the target is a resource or a Fusion view or a Flow view, we cannot just use Router.go
    window.location.href = result.redirectUrl || this.returnUrl || result.defaultUrl || '/';
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

  onAfterEnter(location: RouterLocation) {
    this.returnUrl = location.redirectFrom;
  }
}
