import 'Frontend/demo/init'; // hidden-source-line
import { render } from 'lit-html';
import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';
import {
  NotificationElement,
  NotificationPosition,
} from '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-position')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  render() {
    return html`
      <vaadin-button @click="${this.show}">top-stretch</vaadin-button>
      <vaadin-button @click="${this.show}">top-start</vaadin-button>
      <vaadin-button @click="${this.show}">top-center</vaadin-button>
      <vaadin-button @click="${this.show}">top-end</vaadin-button>
      <vaadin-button @click="${this.show}">middle</vaadin-button>
      <vaadin-button @click="${this.show}">bottom-start</vaadin-button>
      <vaadin-button @click="${this.show}">bottom-center</vaadin-button>
      <vaadin-button @click="${this.show}">bottom-end</vaadin-button>
      <vaadin-button @click="${this.show}">bottom-stretch</vaadin-button>
    `;
  }

  show(e: MouseEvent) {
    // Use the button label as the location
    const position = (e.composedPath()[2] as HTMLElement).textContent as NotificationPosition;

    const notification = new NotificationElement();
    notification.position = position;

    notification.renderer = (root: HTMLElement) => {
      render(
        html`
          <div>${position}</div>
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

    document.body.appendChild(notification);
    notification.open();

    // Remember to clean up the element from the DOM
    // if you are not reusing the same notification
    notification.addEventListener('opened-changed', () => {
      document.body.removeChild(notification);
    });
  }
  // end::snippet[]

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
