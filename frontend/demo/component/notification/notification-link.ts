import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vaadin-template-renderer/src/vaadin-template-renderer'; // hidden-source-line (Legacy template renderer)
import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import {
  NotificationOpenedChangedEvent,
  NotificationRenderer,
} from '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-link')
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
      <vaadin-notification
        duration="0"
        position="middle"
        .opened="${this.notificationOpened}"
        @opened-changed="${(e: NotificationOpenedChangedEvent) => {
          this.notificationOpened = e.detail.value;
        }}"
        .renderer="${guard(
          [],
          (): NotificationRenderer => (root) => {
            render(
              html`
                <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
                  <div>Jason Bailey mentioned you in <a href="#">Project Q4</a></div>
                  <vaadin-button
                    theme="tertiary-inline"
                    aria-label="Close"
                    @click="${() => (this.notificationOpened = false)}"
                  >
                    <vaadin-icon icon="lumo:cross"></vaadin-icon>
                  </vaadin-button>
                </vaadin-horizontal-layout>
              `,
              root
            );
          }
        )}"
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }
}
