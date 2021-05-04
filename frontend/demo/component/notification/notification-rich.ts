import 'Frontend/demo/init'; // hidden-source-line
import { render } from 'lit-html';
import { html, LitElement, customElement } from 'lit-element';
import { guard } from 'lit-html/directives/guard';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';
import { NotificationElement } from '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-rich')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-notification
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <iron-icon icon="lumo:checkmark" class="checkmark"></iron-icon>
              <div>Application submitted!</div>
              <div style="width: 2em"></div>
              <vaadin-button @click="${this.close.bind(this, 1)}">View</vaadin-button>
              <vaadin-button
                theme="tertiary-inline"
                @click="${this.close.bind(this, 1)}"
                aria-label="Close"
              >
                <iron-icon icon="lumo:cross"></iron-icon>
              </vaadin-button>
            `,
            root
          );
        })}"
        theme="success"
        position="middle"
      ></vaadin-notification>

      <vaadin-notification
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <iron-icon icon="vaadin:warning" class="warning"></iron-icon>
              <div>Failed to generate report</div>
              <div style="width: 2em"></div>
              <vaadin-button @click="${this.close.bind(this, 2)}">Retry</vaadin-button>
              <vaadin-button
                theme="tertiary-inline"
                @click="${this.close.bind(this, 2)}"
                aria-label="Close"
              >
                <iron-icon icon="lumo:cross"></iron-icon>
              </vaadin-button>
            `,
            root
          );
        })}"
        theme="error"
        position="middle"
      ></vaadin-notification>

      <vaadin-notification
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-avatar name="Jason Bailey"></vaadin-avatar>
              <div><b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a></div>
              <vaadin-button
                theme="tertiary-inline"
                @click="${this.close.bind(this, 3)}"
                aria-label="Close"
              >
                <iron-icon icon="lumo:cross"></iron-icon>
              </vaadin-button>
            `,
            root
          );
        })}"
        position="middle"
      ></vaadin-notification>

      <vaadin-notification
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <iron-icon icon="lumo:checkmark" class="checkmark"></iron-icon>
              <div>
                <b style="color: var(--lumo-success-text-color);">Upload successful</b>
                <div
                  style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);"
                >
                  <b>Financials.xlsx</b> is now available in <a href="#">Documents</a>
                </div>
              </div>
              <vaadin-button
                theme="tertiary-inline"
                @click="${this.close.bind(this, 4)}"
                aria-label="Close"
              >
                <iron-icon icon="lumo:cross"></iron-icon>
              </vaadin-button>
            `,
            root
          );
        })}"
        position="middle"
      ></vaadin-notification>
      <!-- end::snippet[] -->

      <vaadin-button @click="${this.open.bind(this, 1)}" theme="success primary">
        Try it
      </vaadin-button>
      <vaadin-button @click="${this.open.bind(this, 2)}" theme="error primary">
        Try it
      </vaadin-button>
      <vaadin-button @click="${this.open.bind(this, 3)}" theme="contrast">Try it</vaadin-button>
      <vaadin-button @click="${this.open.bind(this, 4)}" theme="success">Try it</vaadin-button>
    `;
  }

  open(which: number) {
    const notification = this.shadowRoot?.querySelector(
      `vaadin-notification:nth-child(${which})`
    ) as NotificationElement;
    notification?.open();
  }

  close(which: number) {
    const notification = this.shadowRoot?.querySelector(
      `vaadin-notification:nth-child(${which})`
    ) as NotificationElement;
    notification?.close();
  }
}
