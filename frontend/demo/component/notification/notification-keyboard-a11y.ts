import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/notification';
import type { NotificationOpenedChangedEvent } from '@vaadin/notification';
import { notificationRenderer } from '@vaadin/notification/lit.js';
import type { NotificationLitRenderer } from '@vaadin/notification/lit.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-keyboard-a11y')
export class Example extends LitElement {
  @state()
  private notificationOpened = true;

  @state()
  private isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(window.navigator.platform);

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  protected override render() {
    return html`
      <!-- end::snippet[] -->
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
    `;
  }

  // end::snippet[]

  // tag::renderer[]
  renderer: NotificationLitRenderer = () => html`
    <vaadin-horizontal-layout style="align-items: center;">
      <div>5 tasks deleted</div>
      <vaadin-button
        style="margin-left: var(--lumo-space-xl);"
        theme="primary"
        @click="${this.close}"
      >
        Undo
        <!-- Ideally, this should be hidden if the
                 device does not have a physical keyboard -->
        ${this.isMac ? '⌘' : 'Ctrl-'}Z
      </vaadin-button>
    </vaadin-horizontal-layout>
  `;

  // end::renderer[]

  // tag::key-down[]
  connectedCallback() {
    super.connectedCallback();

    document.addEventListener('keydown', this.onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (this.notificationOpened && (event.metaKey || event.ctrlKey) && event.key === 'z') {
      // Handle your custom undo logic here
      // Avoid triggering the native undo action
      event.preventDefault();
      this.close();
    }
  };
  // end::key-down[]

  private open() {
    this.notificationOpened = true;
  }

  private close() {
    this.notificationOpened = false;
  }
}
