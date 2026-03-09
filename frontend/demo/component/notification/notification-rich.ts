import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/notification';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import type { Notification } from '@vaadin/notification';
import { notificationRenderer } from '@vaadin/notification/lit.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('notification-rich')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override firstUpdated() {
    this.renderRoot
      .querySelectorAll<Notification>('vaadin-notification')
      .forEach((notification) => notification.open());
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <!-- The duration is set to 0-sec to prevent the notification from auto-close. -->
      <vaadin-notification
        duration="0"
        ${notificationRenderer(
          () => html`
            <vaadin-horizontal-layout
              theme="spacing"
              style="align-items: center; min-width: 350px;"
            >
              <vaadin-icon icon="vaadin:check-circle"></vaadin-icon>
              <div>Application submitted!</div>
              <vaadin-button slot="end">View</vaadin-button>
              <vaadin-button slot="end" theme="icon" aria-label="Close">
                <vaadin-icon icon="lumo:cross"></vaadin-icon>
              </vaadin-button>
            </vaadin-horizontal-layout>
          `,
          []
        )}
        theme="success"
        position="middle"
      ></vaadin-notification>

      <vaadin-notification
        duration="0"
        ${notificationRenderer(
          () => html`
            <vaadin-horizontal-layout
              theme="spacing"
              style="align-items: center; min-width: 350px;"
            >
              <vaadin-icon icon="vaadin:warning"></vaadin-icon>
              <div>Failed to generate report</div>
              <vaadin-button slot="end">Retry</vaadin-button>
              <vaadin-button slot="end" theme="icon" aria-label="Close">
                <vaadin-icon icon="lumo:cross"></vaadin-icon>
              </vaadin-button>
            </vaadin-horizontal-layout>
          `,
          []
        )}
        theme="error"
        position="middle"
      ></vaadin-notification>

      <vaadin-notification
        duration="0"
        ${notificationRenderer(
          () => html`
            <vaadin-horizontal-layout
              theme="spacing"
              style="align-items: center; min-width: 350px;"
            >
              <vaadin-avatar name="Jason Bailey"></vaadin-avatar>
              <div><b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a></div>
              <vaadin-button slot="end" theme="icon" aria-label="Close">
                <vaadin-icon icon="lumo:cross"></vaadin-icon>
              </vaadin-button>
            </vaadin-horizontal-layout>
          `,
          []
        )}
        position="middle"
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }
}
