import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-notification/vaadin-notification';
import { render } from 'lit-html';

@customElement('notification-success')
export class Example extends LitElement {
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
