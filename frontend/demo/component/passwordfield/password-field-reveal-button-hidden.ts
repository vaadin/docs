import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/password-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('password-field-reveal-button-hidden')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-password-field
        label="Password"
        value="Ex@mplePassw0rd"
        reveal-button-hidden
      ></vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }
}
