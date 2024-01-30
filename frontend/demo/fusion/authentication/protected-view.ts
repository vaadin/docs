import { BeforeEnterObserver, PreventAndRedirectCommands, RouterLocation } from '@vaadin/router';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { isLoggedIn } from './auth';

@customElement('protected-view')
export class ProtectedView extends LitElement implements BeforeEnterObserver {
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
