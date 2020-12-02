import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import { NotificationElement } from '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-button/vaadin-button';
import { render } from 'lit-html';

@customElement('notification-undo')
export class Example extends LitElement {
  @internalProperty()
  private notification: NotificationElement | null | undefined;

  @internalProperty()
  private isMac =
    ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].indexOf(window.navigator.platform) > -1;

  render() {
    return html`
      <vaadin-button @click=${this.open}>Try it</vaadin-button>

      <!-- tag::snippet[] -->
      <vaadin-notification
        .renderer="${(root: HTMLElement) =>
          render(
            html`
              5 tasks deleted

              <span style="width: 2em"></span>

              <vaadin-button theme="primary" @click="${this.close.bind(this)}">
                Undo
                <!-- Ideally, this should be hidden if the device does not have a physical keyboard -->
                <span aria-hidden="true"> &nbsp; ${this.isMac ? '⌘' : 'Ctrl-'}Z</span>
              </vaadin-button>
            `,
            root
          )}"
        theme="contrast"
        position="middle"
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }

  firstUpdated() {
    this.notification = this.shadowRoot?.querySelector('vaadin-notification');

    document.addEventListener('keydown', e => {
      if (this.notification?.opened && (e.metaKey || e.ctrlKey) && e.key == 'z') {
        // Handle your custom undo logic here
        // Avoid triggering the native undo action
        e.preventDefault();
        this.notification?.close();
      }
    });
  }

  open() {
    this.notification?.open();
  }

  close() {
    this.notification?.close();
  }
}
