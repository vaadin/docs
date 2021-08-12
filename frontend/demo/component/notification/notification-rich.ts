import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, render } from 'lit';
import { customElement } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { NotificationElement } from '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-rich')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-notification
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <vaadin-horizontal-layout theme="spacing" style="align-items: center">
                <vaadin-icon icon="vaadin:check-circle"></vaadin-icon>
                <div>Application submitted!</div>
                <vaadin-button
                  style="margin: 0 0 0 var(--lumo-space-l)"
                  @click="${this.close.bind(this, 1)}"
                  >View</vaadin-button
                >
                <vaadin-button
                  theme="tertiary-inline"
                  @click="${this.close.bind(this, 1)}"
                  aria-label="Close"
                >
                  <vaadin-icon icon="lumo:cross"></vaadin-icon>
                </vaadin-button>
              </vaadin-horizontal-layout>
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
              <vaadin-horizontal-layout theme="spacing" style="align-items: center">
                <vaadin-icon icon="vaadin:warning"></vaadin-icon>
                <div>Failed to generate report</div>
                <vaadin-button
                  style="margin: 0 0 0 var(--lumo-space-l)"
                  @click="${this.close.bind(this, 2)}"
                  >Retry</vaadin-button
                >
                <vaadin-button
                  theme="tertiary-inline"
                  @click="${this.close.bind(this, 2)}"
                  aria-label="Close"
                >
                  <vaadin-icon icon="lumo:cross"></vaadin-icon>
                </vaadin-button>
              </vaadin-horizontal-layout>
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
              <vaadin-horizontal-layout theme="spacing" style="align-items: center">
                <vaadin-avatar name="Jason Bailey"></vaadin-avatar>
                <div><b>Jason Bailey</b> mentioned you in <a href="#">Project Q4</a></div>
                <vaadin-button
                  theme="tertiary-inline"
                  @click="${this.close.bind(this, 3)}"
                  aria-label="Close"
                >
                  <vaadin-icon icon="lumo:cross"></vaadin-icon>
                </vaadin-button>
              </vaadin-horizontal-layout>
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
                  @click="${this.close.bind(this, 4)}"
                  aria-label="Close"
                >
                  <vaadin-icon icon="lumo:cross"></vaadin-icon>
                </vaadin-button>
              </vaadin-horizontal-layout>
            `,
            root
          );
        })}"
        position="middle"
      ></vaadin-notification>
      <!-- end::snippet[] -->
      <vaadin-horizontal-layout theme="spacing" style="justify-content: center">
        <vaadin-button @click="${this.open.bind(this, 1)}" theme="success primary">
          Try it
        </vaadin-button>
        <vaadin-button @click="${this.open.bind(this, 2)}" theme="error primary">
          Try it
        </vaadin-button>
        <vaadin-button @click="${this.open.bind(this, 3)}" theme="contrast">Try it</vaadin-button>
        <vaadin-button @click="${this.open.bind(this, 4)}" theme="success">Try it</vaadin-button>
      </vaadin-horizontal-layout>
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
