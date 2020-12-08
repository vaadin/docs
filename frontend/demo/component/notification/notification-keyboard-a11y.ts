import '../../init'; // hidden-full-source-line

import { render } from 'lit-html';
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import { NotificationElement } from '@vaadin/vaadin-notification/vaadin-notification';

@customElement('notification-keyboard-a11y')
export class Example extends LitElement {
  @internalProperty()
  private notification: NotificationElement | null | undefined;

  @internalProperty()
  private isMac =
    ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].indexOf(window.navigator.platform) > -1;

  render() {
    return html`
      <vaadin-button @click="${this.open}">Try it</vaadin-button>

      <!-- tag::snippet[] -->
      <vaadin-notification
        .renderer="${(root: HTMLElement) =>
          render(
            html`
              <div>5 tasks deleted</div>
              <div style="width: 2em"></div>
              <vaadin-button theme="primary" @click="${this.close.bind(this)}">
                Undo
                <!-- Ideally, this should be hidden if the device does not have a physical keyboard -->
                <span aria-hidden="true"> &nbsp; ${this.isMac ? '⌘' : 'Ctrl-'}Z</span>
              </vaadin-button>
            `,
            root
          )}"
        theme="contrast"
        position="bottom-start"
        duration="10000"
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
