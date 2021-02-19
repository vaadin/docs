import { LitElement, html, customElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';

@customElement('fusion-application-events-basic')
export class EventsBasic extends LitElement {
  render() {
    return html`
      <vaadin-horizontal-layout>
        <vaadin-button @click=${this.onClick}>Read More</vaadin-button>
        <vaadin-button @click=${this.onClick}>Read More</vaadin-button>
      </vaadin-horizontal-layout>
    `;
  }

  onClick() {
    console.log('clicked');
  }
}
