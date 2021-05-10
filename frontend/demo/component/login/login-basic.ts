import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-login/vaadin-login-form';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('login-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      :host {
        background-color: var(--lumo-contrast-5pct);
        display: flex !important;
        justify-content: center;
        padding: var(--lumo-space-l);
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-login-form></vaadin-login-form>
      <!-- end::snippet[] -->
    `;
  }
}
