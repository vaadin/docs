import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import {
  NotificationRenderer,
  NotificationOpenedChangedEvent,
} from '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-keyboard-a11y')
export class Example extends LitElement {
  @state()
  private notificationOpened = false;

  @state()
  private isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(window.navigator.platform);

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  render() {
    return html`
      <!-- end::snippet[] -->
      <vaadin-button
        @click="${() => (this.notificationOpened = true)}"
        .disabled="${this.notificationOpened}"
      >
        Try it
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
        .renderer="${this.renderer}"
      ></vaadin-notification>
    `;
  }

  // end::snippet[]

  // tag::renderer[]
  renderer: NotificationRenderer = (root) => {
    render(
      html`
        <vaadin-horizontal-layout style="align-items: center;">
          <div>5 tasks deleted</div>
          <vaadin-button
            style="margin-left: var(--lumo-space-xl);"
            theme="primary"
            @click="${() => (this.notificationOpened = false)}"
          >
            Undo
            <!-- Ideally, this should be hidden if the
                 device does not have a physical keyboard -->
            ${this.isMac ? '⌘' : 'Ctrl-'}Z
          </vaadin-button>
        </vaadin-horizontal-layout>
      `,
      root
    );
  };

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
    if (this.notificationOpened && (event.metaKey || event.ctrlKey) && event.key == 'z') {
      // Handle your custom undo logic here
      // Avoid triggering the native undo action
      event.preventDefault();
      this.notificationOpened = false;
    }
  };
  // end::key-down[]
}
