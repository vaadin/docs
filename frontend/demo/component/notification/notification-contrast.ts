import '../../init'; // hidden-full-source-line

import { render } from 'lit-html';
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('notification-contrast')
export class Example extends LitElement {
  @internalProperty()
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
        theme="contrast"
        .opened="${this.notificationOpen}"
        @opened-changed="${(e: any) => (this.notificationOpen = e.detail.value)}"
        .renderer="${this.renderer}"
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }

  renderer = (root: HTMLElement) =>
    render(
      html`
        <div>5 tasks deleted</div>
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
}
