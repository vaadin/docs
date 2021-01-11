import '../../init'; // hidden-full-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import { applyTheme } from 'themes/theme-generated.js';

// tag::snippet[]
@customElement('button-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private clickedText = '';

  render() {
    return html`
      <vaadin-button @click=${this.clickListener}>Button</vaadin-button>
      ${this.clickedText}
    `;
  }

  clickListener() {
    this.clickedText = 'The button was clicked';
  }
}
// end::snippet[]
