import '@vaadin/login';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { LoginResult } from '@vaadin/hilla-frontend';
import type { RouterLocation, WebComponentInterface } from '@vaadin/router';
import { login } from './auth';

@customElement('login-view')
export class LoginView extends LitElement implements WebComponentInterface {
  @state()
  private error = false;

  // the url to redirect to after a successful login
  private returnUrl?: string;

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
    const result = await login(event.detail.username, event.detail.password, {
      navigate: (toPath: string) => {
        // Consider absolute path to be within the application context.
        const serverUrl = toPath.startsWith('/') ? new URL(`.${toPath}`, document.baseURI) : toPath;

        // If a login redirect was initiated by the client router, this.returnUrl contains the original destination.
        // Otherwise, use the URL provided by the server.
        // As we do not know if the target is a resource or a Hilla view or a Flow view, we cannot just use Router.go
        window.location.replace(this.returnUrl ?? serverUrl);
      },
    });
    this.error = result.error;

    return result;
  }

  onAfterEnter(location: RouterLocation) {
    this.returnUrl = location.redirectFrom;
  }
}
