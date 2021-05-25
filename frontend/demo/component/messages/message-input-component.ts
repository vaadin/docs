import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-messages/vaadin-message-input';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';
import { guard } from 'lit/directives/guard.js';

@customElement('message-input-component')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private message = '';

  @state()
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
