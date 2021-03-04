import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import { applyTheme } from 'generated/theme';
import './login-overlay-mockup';

@customElement('login-modal-overlay-header')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <login-overlay-mockup
        headerTitle="TaskMob"
        description="Built with ♥ by Vaadin"
      ></login-overlay-mockup>
    `;
  }
}
