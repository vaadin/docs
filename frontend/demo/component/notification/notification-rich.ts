import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/notification';
import { notificationRenderer } from '@vaadin/notification/lit.js';
import type { Notification } from '@vaadin/notification';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-rich')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-notification
        ${notificationRenderer(
          (notification) => html`
            <vaadin-horizontal-layout theme="spacing" style="align-items: center">
              <vaadin-icon icon="vaadin:check-circle"></vaadin-icon>
              <div>Application submitted!</div>
              <vaadin-button
                style="margin: 0 0 0 var(--lumo-space-l)"
                @click="${() => notification.close()}"
              >
                View
              </vaadin-button>
              <vaadin-button
                theme="tertiary-inline"
                @click="${() => notification.close()}"
                aria-label="Close"
              >
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
        ${notificationRenderer(
          (notification) => html`
            <vaadin-horizontal-layout theme="spacing" style="align-items: center">
              <vaadin-icon icon="vaadin:warning"></vaadin-icon>
              <div>Failed to generate report</div>
              <vaadin-button
                style="margin: 0 0 0 var(--lumo-space-l)"
                @click="${() => notification.close()}"
              >
                Retry
              </vaadin-button>
              <vaadin-button
                theme="tertiary-inline"
                @click="${() => notification.close()}"
                aria-label="Close"
              >
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
        ${notificationRenderer(
          (notification) => html`
            <vaadin-horizontal-layout theme="spacing" style="align-items: center">
              <vaadin-avatar name="Jason Bailey"></vaadin-avatar>
              <div><b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a></div>
              <vaadin-button
                theme="tertiary-inline"
                @click="${() => notification.close()}"
                aria-label="Close"
              >
                <vaadin-icon icon="lumo:cross"></vaadin-icon>
              </vaadin-button>
            </vaadin-horizontal-layout>
          `,
          []
        )}
        position="middle"
      ></vaadin-notification>

      <vaadin-notification
        ${notificationRenderer(
          (notification) => html`
            <vaadin-horizontal-layout theme="spacing" style="align-items: center">
              <vaadin-icon
                icon="vaadin:check-circle"
                style="color: var(--lumo-success-color)"
              ></vaadin-icon>
              <div>
                <b style="color: var(--lumo-success-text-color);">Upload successful</b>
                <div
                  style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color)"
                >
                  <b>Financials.xlsx</b> is now available in <a href="#">Documents</a>
                </div>
              </div>
              <vaadin-button
                theme="tertiary-inline"
                @click="${() => notification.close()}"
                aria-label="Close"
              >
                <vaadin-icon icon="lumo:cross"></vaadin-icon>
              </vaadin-button>
            </vaadin-horizontal-layout>
          `,
          []
        )}
        position="middle"
      ></vaadin-notification>
      <!-- end::snippet[] -->
      <vaadin-horizontal-layout theme="spacing" style="justify-content: center">
        <vaadin-button @click="${this.open}" data-which="1" theme="success primary">
          Try it
        </vaadin-button>
        <vaadin-button @click="${this.open}" data-which="2" theme="error primary">
          Try it
        </vaadin-button>
        <vaadin-button @click="${this.open}" data-which="3" theme="contrast">Try it</vaadin-button>
        <vaadin-button @click="${this.open}" data-which="4" theme="success">Try it</vaadin-button>
      </vaadin-horizontal-layout>
    `;
  }

  open(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const notification = this.renderRoot.querySelector<Notification>(
      `vaadin-notification:nth-child(${target.dataset.which})`
    );
    notification?.open();
  }
}
