import '../../init'; // hidden-full-source-line

import { render } from 'lit-html';
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import { guard } from 'lit-html/directives/guard';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-notification/vaadin-notification';

@customElement('notification-retry')
export class Example extends LitElement {
  @internalProperty()
  private notificationOpen = false;

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
              <div>Failed to generate report</div>
              <div style="width: 2em"></div>
              <vaadin-button
                theme="tertiary-inline"
                @click="${() => (this.notificationOpen = false)}"
              >
                Retry
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
        theme="error"
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }
}
