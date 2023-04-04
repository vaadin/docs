import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import { Notification } from '@vaadin/notification';
import type { NotificationOpenedChangedEvent } from '@vaadin/notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-success')
export class Example extends LitElement {
  @state()
  private notificationOpened = false;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  handleClick() {
    // tag::snippet[]
    const notification = Notification.show('Application submitted!', {
      position: 'middle',
    });
    notification.setAttribute('theme', 'success');
    // end::snippet[]
    this.notificationOpened = true;
    const handleOpenChanged = (e: NotificationOpenedChangedEvent) => {
      if (!e.detail.value) {
        this.notificationOpened = false;
        notification.removeEventListener('opened-changed', handleOpenChanged);
      }
    };
    notification.addEventListener('opened-changed', handleOpenChanged);
  }

  protected override render() {
    return html`
      <vaadin-button @click="${this.handleClick}" .disabled="${this.notificationOpened}">
        Try it
      </vaadin-button>
    `;
  }
}
