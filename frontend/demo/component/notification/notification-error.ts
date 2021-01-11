import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-notification/vaadin-notification';
import { render } from 'lit-html';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('notification-error')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private opened = true;

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-notification
        theme="error"
        .opened=${this.opened}
        position="bottom-stretch"
        duration="0"
        .renderer=${(root: HTMLElement) =>
          render(
            html`
              <div style="display: flex; justify-content: space-between; width:100%;">
                <span>Failed to generate report</span
                ><span @click=${() => (this.opened = false)}>X</span>
              </div>
            `,
            root
          )}
      >
      </vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }
}
