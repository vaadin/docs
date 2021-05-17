import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import './login-overlay-mockup';

@customElement('login-overlay-header')
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
