import 'Frontend/demo/init'; // hidden-source-line
import { render } from 'lit-html';
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import { guard } from 'lit-html/directives/guard';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-keyboard-a11y')
export class Example extends LitElement {
  @internalProperty()
  private notificationOpen = false;

  @internalProperty()
  private isMac =
    ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].indexOf(window.navigator.platform) > -1;

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <vaadin-button
        @click="${() => (this.notificationOpen = true)}"
        .disabled="${this.notificationOpen}"
      >
        Try it
      </vaadin-button>

      <!-- tag::snippet[] -->
      <vaadin-notification
        .opened="${this.notificationOpen}"
        @opened-changed="${(e: any) => (this.notificationOpen = e.detail.value)}"
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <div>5 tasks deleted</div>
              <div style="width: 2em"></div>
              <vaadin-button theme="primary" @click="${() => (this.notificationOpen = false)}">
                Undo
                <!-- Ideally, this should also be hidden if the
                     device does not have a physical keyboard -->
                <span aria-hidden="true"> &nbsp; ${this.isMac ? '⌘' : 'Ctrl-'}Z </span>
              </vaadin-button>
            `,
            root
          );
        })}"
        theme="contrast"
        duration="10000"
        position="middle"
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }

  firstUpdated() {
    document.addEventListener('keydown', (e) => {
      if (this.notificationOpen && (e.metaKey || e.ctrlKey) && e.key == 'z') {
        // Handle your custom undo logic here
        // Avoid triggering the native undo action
        e.preventDefault();
        this.notificationOpen = false;
      }
    });
  }
}
