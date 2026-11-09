import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/notification';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { Notification } from '@vaadin/notification';
import { notificationRenderer } from '@vaadin/notification/lit.js';

@customElement('notification-color-scheme')
export class Example extends LitElement {
  protected override firstUpdated() {
    this.renderRoot
      .querySelectorAll<Notification>('vaadin-notification')
      .forEach((notification) => notification.open());
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-notification
        theme="info"
        position="middle"
        duration="0"
        ${notificationRenderer(() => html`Default light color scheme`, [])}
      ></vaadin-notification>

      <vaadin-notification
        theme="info"
        position="middle"
        duration="0"
        overlay-class="dark"
        ${notificationRenderer(() => html`Forced dark color scheme`, [])}
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }
}
