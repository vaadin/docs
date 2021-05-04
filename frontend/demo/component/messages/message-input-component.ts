import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-messages/vaadin-message-input';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';
import { guard } from 'lit-html/directives/guard';

@customElement('message-input-component')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private message = '';

  @internalProperty()
  private notificationOpened = false;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-message-input @submit="${this._handleSubmit}"></vaadin-message-input>
      <!-- end::snippet[] -->
      <vaadin-notification
        id="notification"
        position="middle"
        .opened="${this.notificationOpened}"
        @opened-changed="${(e: CustomEvent) => (this.notificationOpened = e.detail.value)}"
        .renderer="${guard([this.message], () => (root: HTMLElement) => {
          root.textContent = `Message received: ${this.message}`;
        })}"
      ></vaadin-notification>
    `;
  }

  _handleSubmit(event: CustomEvent) {
    this.message = event.detail.value;
    this.notificationOpened = true;
  }
}
