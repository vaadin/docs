import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import {
  NotificationRenderer,
  NotificationOpenedChangedEvent,
} from '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-error')
export class Example extends LitElement {
  @state()
  private notificationOpened = false;

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <vaadin-button
        @click="${() => (this.notificationOpened = true)}"
        .disabled="${this.notificationOpened}"
      >
        Try it
      </vaadin-button>

      <!-- tag::snippet[] -->
      <!-- The duration is set to 0-sec to prevent the notification from auto-close. -->
      <vaadin-notification
        theme="error"
        duration="0"
        position="middle"
        .opened="${this.notificationOpened}"
        @opened-changed="${(e: NotificationOpenedChangedEvent) => {
          this.notificationOpened = e.detail.value;
        }}"
        .renderer="${this.renderer}"
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }

  // tag::renderer[]
  renderer: NotificationRenderer = (root) => {
    render(
      html`
        <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
          <div>Failed to generate report</div>
          <vaadin-button
            theme="tertiary-inline"
            @click="${() => (this.notificationOpened = false)}"
            aria-label="Close"
          >
            <vaadin-icon icon="lumo:cross"></vaadin-icon>
          </vaadin-button>
        </vaadin-horizontal-layout>
      `,
      root
    );
  };
  // end::renderer[]
}
