import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import {
  NotificationElement,
  NotificationPosition
} from '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';
import { render } from 'lit-html';

@customElement('notification-position')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-button @click=${this.show.bind(this, 'top-stretch')}>top-stretch</vaadin-button>
      <vaadin-button @click=${this.show.bind(this, 'top-start')}>top-start</vaadin-button>
      <vaadin-button @click=${this.show.bind(this, 'top-center')}>top-center</vaadin-button>
      <vaadin-button @click=${this.show.bind(this, 'top-end')}>top-end</vaadin-button>
      <vaadin-button @click=${this.show.bind(this, 'middle')}>middle</vaadin-button>
      <vaadin-button @click=${this.show.bind(this, 'bottom-start')}>bottom-start</vaadin-button>
      <vaadin-button @click=${this.show.bind(this, 'bottom-center')}>bottom-center</vaadin-button>
      <vaadin-button @click=${this.show.bind(this, 'bottom-end')}>bottom-end</vaadin-button>
      <vaadin-button @click=${this.show.bind(this, 'bottom-stretch')}>bottom-stretch</vaadin-button>
    `;
  }

  show(position: NotificationPosition) {
    const notification = new NotificationElement();
    notification.position = position;

    notification.renderer = (root: HTMLElement) => {
      render(
        html`
          ${position}
          <vaadin-button
            theme="tertiary-inline"
            @click="${notification.close.bind(notification)}"
            aria-label="Close"
          >
            <iron-icon icon="lumo:cross"></iron-icon>
          </vaadin-button>
        `,
        root
      );
    };

    this.shadowRoot?.appendChild(notification);
    notification.open();
  }

  static styles = css`
    :host {
      display: grid !important;
      grid-gap: 1em;
      grid-template-columns: 1fr 1fr 1fr;
    }

    vaadin-button {
      margin: 0;
      max-width: 100%;
    }

    vaadin-button:nth-child(2),
    vaadin-button:nth-child(6) {
      margin-inline-end: auto;
    }

    vaadin-button:nth-child(3),
    vaadin-button:nth-child(5),
    vaadin-button:nth-child(7) {
      margin: 0 auto;
    }

    vaadin-button:nth-child(4),
    vaadin-button:nth-child(8) {
      margin-inline-start: auto;
    }

    vaadin-button:nth-child(1),
    vaadin-button:nth-child(5),
    vaadin-button:nth-child(9) {
      grid-column-start: 1;
      grid-column-end: 4;
    }
  `;
}
