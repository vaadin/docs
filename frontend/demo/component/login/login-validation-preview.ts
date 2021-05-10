import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement } from 'lit-element';
import { applyTheme } from 'Frontend/generated/theme';
import './login-overlay-mockup';

@customElement('login-validation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`<login-overlay-mockup error></login-overlay-mockup>`;
  }
}
