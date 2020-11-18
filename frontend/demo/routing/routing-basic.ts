import { LitElement, html, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';

@customElement('routing-basic')
export class RoutingBasic extends LitElement {
  render() {
    return html`
      <vaadin-button @click=${this.onClick}>Read More</vaadin-button>
    `;
  }

  onClick() {
    console.log('clicked');
  }
}
