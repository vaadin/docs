import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/vaadin-template-renderer/src/vaadin-template-renderer'; // hidden-source-line (Legacy template renderer)

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators';
import { guard } from 'lit/directives/guard';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-basic')
export class Example extends LitElement {
  @state()
  private notificationOpened = false;

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <vaadin-button
        @click="${() => (this.notificationOpened = true)}"
        .disabled="${this.notificationOpened}"
      >
        Try it
      </vaadin-button>

      <!-- tag::snippet[] -->
      <vaadin-notification
        position="middle"
        .opened="${this.notificationOpened}"
        duration="1000000"
        @opened-changed="${(e: any) => (this.notificationOpened = e.detail.value)}"
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <div>Content</div>
              <vaadin-button>Click me!</vaadin-button>
            `,
            root
          );
        })}"
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }
}
