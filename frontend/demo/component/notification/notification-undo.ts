import 'Frontend/demo/init'; // hidden-source-line
import { render } from 'lit-html';
import { html, LitElement } from 'lit';
import { customElement, state } from `lit/decorators.js`;
import { guard } from 'lit-html/directives/guard';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-undo')
export class Example extends LitElement {
  @state()
  private notificationOpen = false;

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
              <vaadin-button
                theme="tertiary-inline"
                @click="${() => (this.notificationOpen = false)}"
              >
                Undo
              </vaadin-button>
              <vaadin-button
                theme="tertiary-inline"
                @click="${() => (this.notificationOpen = false)}"
                aria-label="Close"
              >
                <iron-icon icon="lumo:cross"></iron-icon>
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
}
