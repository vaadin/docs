import { LitElement, html, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';

@customElement('routing-registration')
export class RegistrationView extends LitElement {
  render() {
    return html`<vaadin-button @click="${this.onClick}">Read More</vaadin-button>`;
  }

  onClick() {
    console.log('clicked');
  }
}
