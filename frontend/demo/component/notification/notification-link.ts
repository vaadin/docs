import 'Frontend/demo/init'; // hidden-source-line
import { render } from 'lit-html';
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import { guard } from 'lit-html/directives/guard';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-link')
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
        .opened="${this.notificationOpen}"
        @opened-changed="${(e: any) => (this.notificationOpen = e.detail.value)}"
        .renderer="${guard([], () => (root: HTMLElement) => {
          render(
            html`
              <div>Jason Bailey mentioned you in <a href="#">Project Q4</a></div>
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
        position="middle"
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }
}
