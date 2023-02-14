import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/button';

@customElement('routing-registration')
export class RegistrationView extends LitElement {
  protected override render() {
    return html`<vaadin-button @click="${this.onClick}">Read More</vaadin-button>`;
  }

  onClick() {
    console.log('clicked');
  }
}
