import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('password-field-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-password-field label="Password" value="Ex@mplePassw0rd"></vaadin-password-field>
      <!-- end::snippet[] -->
    `;
  }
}
