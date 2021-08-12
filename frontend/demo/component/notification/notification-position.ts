import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, render } from 'lit';
import { customElement } from 'lit/decorators';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import {
  NotificationElement,
  NotificationPosition,
} from '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-position')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  constructor() {
    super();
    this.classList.add('notification-position-example');
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

  show(event: MouseEvent) {
    // Use the button label as the location
    const position = (event.target as HTMLElement).textContent as NotificationPosition;

    const notification = new NotificationElement();
    notification.position = position;
    notification.renderer = (root) => {
      render(html`${position}`, root);
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
}
