import '../../init'; // hidden-full-source-line

import { render } from 'lit-html';
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';
import { NotificationElement } from '@vaadin/vaadin-notification/vaadin-notification';

@customElement('notification-retry')
export class Example extends LitElement {
  @internalProperty()
  private notification: NotificationElement | null | undefined;

  render() {
    return html`
      <vaadin-button @click=${this.open}>Try it</vaadin-button>

      <!-- tag::snippet[] -->
      <vaadin-notification
        .renderer="${(root: HTMLElement) =>
          render(
            html`
              <div>Failed to generate report</div>
              <div style="width: 2em"></div>
              <vaadin-button theme="tertiary-inline" @click="${this.close.bind(this)}">
                Retry
              </vaadin-button>
              <vaadin-button
                theme="tertiary-inline"
                @click="${this.close.bind(this)}"
                aria-label="Close"
              >
                <iron-icon icon="lumo:cross"></iron-icon>
              </vaadin-button>
            `,
            root
          )}"
        theme="error"
        position="bottom-start"
        duration="0"
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }

  firstUpdated() {
    this.notification = this.shadowRoot?.querySelector('vaadin-notification');
  }

  open() {
    this.notification?.open();
  }

  close() {
    this.notification?.close();
  }
}
