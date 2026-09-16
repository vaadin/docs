import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import type {
  PreventAndRedirectCommands,
  RouterLocation,
  WebComponentInterface,
} from '@vaadin/router';
import { isLoggedIn } from './auth';

@customElement('protected-view')
export class ProtectedView extends LitElement implements WebComponentInterface {
  render() {
    return html` I am a protected `;
  }

  onBeforeEnter(_: RouterLocation, commands: PreventAndRedirectCommands) {
    if (!isLoggedIn()) {
      return commands.redirect('/login');
    }
    return undefined;
  }
}
