import '../../init'; // hidden-full-source-line

import { render } from 'lit-html';
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';
import { NotificationElement } from '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('notification-error')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private notification: NotificationElement | null | undefined;

  render() {
    return html`
      <vaadin-button @click="${this.open}">Try it</vaadin-button>

      <!-- tag::snippet[] -->
      <vaadin-notification theme="error"></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }

  firstUpdated() {
    this.notification = this.shadowRoot?.querySelector('vaadin-notification');
    if (this.notification) {
      this.notification.renderer = (root: HTMLElement) =>
        render(
          html`
            <div>Failed to generate report</div>
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
      this.notification.position = 'top-end';
      this.notification.duration = 0;
    }
  }

  open() {
    this.notification?.open();
  }

  close() {
    this.notification?.close();
  }
}
