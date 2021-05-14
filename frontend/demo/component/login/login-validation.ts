import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement} from `lit/decorators.js`;
import '@vaadin/vaadin-login/vaadin-login-overlay';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-validation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-login-overlay opened error></vaadin-login-overlay>
      <!-- end::snippet[] -->
    `;
  }
}
