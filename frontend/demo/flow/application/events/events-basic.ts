import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/horizontal-layout';

@customElement('fusion-application-events-basic')
// tag::snippet[]
export class EventsBasic extends LitElement {
  @state()
  private caption = 'Click me!';

  @state()
  private count = 0;

  render() {
    return html`<vaadin-button @click="${this.onClick}">${this.caption}</vaadin-button>`;
  }

  onClick() {
    this.count = this.count + 1;
    this.caption = 'You have clicked me ' + this.count + ' times';
  }
}
// end::snippet[]
