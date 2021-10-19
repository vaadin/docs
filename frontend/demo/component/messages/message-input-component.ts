import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/message-input';
import { Notification } from '@vaadin/notification';
import { applyTheme } from 'Frontend/generated/theme';

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

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-message-input @submit="${this._handleSubmit}"></vaadin-message-input>
      <!-- end::snippet[] -->
    `;
  }

  _handleSubmit(event: CustomEvent) {
    this.message = event.detail.value;
    Notification.show(`Message received: ${this.message}`, { position: 'middle' });
  }
}
