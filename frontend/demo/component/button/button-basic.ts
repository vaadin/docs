import '../../init'; // hidden-full-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';

// tag::snippet[]
@customElement('button-basic')
export class Example extends LitElement {
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
