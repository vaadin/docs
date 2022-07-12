import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/notification';
import { NotificationOpenedChangedEvent } from '@vaadin/notification';
import { notificationRenderer, NotificationLitRenderer } from '@vaadin/notification/lit.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-retry')
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
        ${notificationRenderer(this.renderer, [])}
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }

  // tag::renderer[]
  renderer: NotificationLitRenderer = () => {
    return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
        <div>Failed to generate report</div>
        <vaadin-button
          theme="tertiary-inline"
          style="margin-left: var(--lumo-space-xl);"
          @click="${this.close}"
        >
          Retry
        </vaadin-button>
        <vaadin-button theme="tertiary-inline icon" @click="${this.close}" aria-label="Close">
          <vaadin-icon icon="lumo:cross"></vaadin-icon>
        </vaadin-button>
      </vaadin-horizontal-layout>
    `;
  };
  // end::renderer[]

  private close() {
    this.notificationOpened = false;
  }
}
