import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/notification';
import type { NotificationOpenedChangedEvent } from '@vaadin/notification';
import { notificationRenderer } from '@vaadin/notification/lit.js';
import type { NotificationLitRenderer } from '@vaadin/notification/lit.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-undo')
export class Example extends LitElement {
  @state()
  private notificationOpened = true;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-button .disabled="${this.notificationOpened}" @click="${this.open}">
        Show notification
      </vaadin-button>

      <!-- tag::snippet[] -->
      <vaadin-notification
        theme="contrast"
        duration="10000"
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
  renderer: NotificationLitRenderer = () => html`
    <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
      <div>5 tasks deleted</div>
      <vaadin-button
        theme="tertiary-inline"
        style="margin-left: var(--lumo-space-xl);"
        @click="${this.close}"
      >
        Undo
      </vaadin-button>
      <vaadin-button theme="tertiary-inline" aria-label="Close" @click="${this.close}">
        <vaadin-icon icon="lumo:cross"></vaadin-icon>
      </vaadin-button>
    </vaadin-horizontal-layout>
  `;
  // end::renderer[]

  private open() {
    this.notificationOpened = true;
  }

  private close() {
    this.notificationOpened = false;
  }
}
