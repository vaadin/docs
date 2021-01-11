import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-notification/vaadin-notification';
import { render } from 'lit-html';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('notification-success')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom application theme to the view.
    // This is only supported if your app uses a custom theme.
    applyTheme(this.shadowRoot);
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-notification
        theme="success"
        opened
        .renderer=${(root: HTMLElement) =>
          render(
            html`
              Application submitted!
            `,
            root
          )}
      ></vaadin-notification>
      <!-- end::snippet[] -->
    `;
  }
}
