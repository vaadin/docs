import { customElement, html, LitElement, property } from 'lit-element';
import { LoginResult } from '@vaadin/flow-frontend';
import { login } from './auth';
import { Router, AfterEnterObserver, RouterLocation } from '@vaadin/router';

@customElement('login-view')
export class LoginView extends LitElement implements AfterEnterObserver {
  @property({ type: Boolean })
  private error = false;

  // the url to redirect to after a successful login
  private returnUrl = '/';

  private onSuccess = (_: LoginResult) => { Router.go(this.returnUrl) };

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
    this.returnUrl = location.redirectFrom || this.returnUrl;
  }
}
