import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/button';
import { Notification } from '@vaadin/notification';
import type { NotificationPosition } from '@vaadin/notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-position')
export class Example extends LitElement {
  protected override createRenderRoot() {
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
  protected override render() {
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

    Notification.show(position, { position });
  }

  // end::snippet[]
}
