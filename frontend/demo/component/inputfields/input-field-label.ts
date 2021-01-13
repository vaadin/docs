import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('input-field-label')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-email-field label="Email address"></vaadin-email-field>
      <!-- end::snippet[] -->
    `;
  }
}
