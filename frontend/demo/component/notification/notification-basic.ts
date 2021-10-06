import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import { NotificationElement } from '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';
import { NotificationOpenedChangedEvent } from '@vaadin/vaadin-notification/src/interfaces';

@customElement('notification-basic')
export class Example extends LitElement {
  @state()
  private notificationOpened = false;

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  handleClick() {
    // tag::snippet[]
    const notification = NotificationElement.show('Financial report generated', {
      position: 'middle',
    });
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

  render() {
    return html`
      <vaadin-button @click="${this.handleClick}" .disabled="${this.notificationOpened}">
        Try it
      </vaadin-button>
    `;
  }
}
