import { Subscription } from '@hilla/frontend';
import '@vaadin/button';
import '@vaadin/notification';
import '@vaadin/text-field';
import { ReactiveEndpoint } from 'Frontend/generated/endpoints.js';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('reactive-view')
export class ReactiveView extends LitElement {
  @property()
  serverTime = '';

  subscription: Subscription<string> | undefined;

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
  }

  // tag::snippet[]
  render() {
    return html`
      <vaadin-text-field label="Server time" .value=${this.serverTime}></vaadin-text-field>
      <vaadin-button @click=${this.toggleServerClock}>Toggle server clock</vaadin-button>
    `;
  }

  toggleServerClock() {
    if (this.subscription) {
      this.subscription.cancel();
      this.subscription = undefined;
    } else {
      (this.subscription = ReactiveEndpoint.getClockCancellable()).onNext((time) => {
        this.serverTime = time;
      });
    }
  }
  // end::snippet[]
}
