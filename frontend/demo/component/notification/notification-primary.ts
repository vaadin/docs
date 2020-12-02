import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import { NotificationElement } from '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';
import { render } from 'lit-html';

@customElement('notification-basic')
export class Example extends LitElement {
  @internalProperty()
  private notification: NotificationElement | null | undefined;

  render() {
    return html`
      <vaadin-button @click="${this.open}" theme="primary">Try it</vaadin-button>

      <!-- tag::snippet[] -->
      <vaadin-notification theme="primary"></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }

  firstUpdated() {
    this.notification = this.shadowRoot?.querySelector('vaadin-notification');
    if (this.notification) {
      this.notification.renderer = (root: HTMLElement) =>
        render(
          html`
            New project plan available

            <vaadin-button
              theme="tertiary-inline"
              @click="${this.close.bind(this)}"
              aria-label="Close"
            >
              <iron-icon icon="lumo:cross"></iron-icon>
            </vaadin-button>
          `,
          root
        );
      this.notification.position = 'middle';
    }
  }

  open() {
    this.notification?.open();
  }

  close() {
    this.notification?.close();
  }
}
