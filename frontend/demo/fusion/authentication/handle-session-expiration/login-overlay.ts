import { customElement, LitElement } from 'lit-element';
import { Router } from '@vaadin/router';
import { LoginResult } from '@vaadin/flow-frontend';

@customElement('login-view')
export class LoginView extends LitElement {
  private returnUrl = '/';

  // @ts-ignore
  private onSuccess = (_: LoginResult) => {
    Router.go(this.returnUrl);
  };

  private static overlayResult?: Promise<LoginResult>;

  // Show the login view as an overlay, when the session has
  // expired, and a user tries to invoke an endpoint call.
  // Close the login overly once the login attempt has succeeded.
  static async showOverlay(): Promise<LoginResult> {
    if (this.overlayResult) {
      return this.overlayResult;
    }
    const overlay = new this();
    return (this.overlayResult = new Promise((resolve) => {
      overlay.onSuccess = (result) => {
        this.overlayResult = undefined;
        overlay.remove();
        resolve(result);
      };
      document.body.append(overlay);
    }));
  }
}
