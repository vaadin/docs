import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-error')
export class Example extends LitElement {
  @state()
  private notificationOpen = false;

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
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
        theme="error"
        position="middle"
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
        <div>Failed to generate report</div>
        <vaadin-button
          theme="tertiary-inline"
          @click="${() => (this.notificationOpen = false)}"
          aria-label="Close"
        >
          <vaadin-icon icon="lumo:cross"></vaadin-icon>
        </vaadin-button>
      `,
      root
    );
}
