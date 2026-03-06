import '@vaadin/button';
import '@vaadin/horizontal-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// tag::snippet[]
export @customElement('fusion-application-events-basic')
class EventsBasic extends LitElement {
  @state()
  private caption = 'Click me!';

  @state()
  private count = 0;

  protected override render() {
    return html`<vaadin-button @click="${this.onClick}">${this.caption}</vaadin-button>`;
  }

  onClick() {
    this.count += 1;
    this.caption = `You have clicked me ${this.count} times`;
  }
}
// end::snippet[]
