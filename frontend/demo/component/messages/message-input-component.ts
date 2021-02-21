import '../../init'; // hidden-full-source-line

import { render } from 'lit-html';
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-messages/vaadin-message-input';
import '@vaadin/vaadin-notification/vaadin-notification';
import { applyTheme } from 'generated/theme';
import { NotificationElement } from '@vaadin/vaadin-notification/vaadin-notification';

@customElement('message-input-component')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private message = '';

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-message-input @submit="${this._handleSubmit}"></vaadin-message>
      <!-- end::snippet[] -->
      <vaadin-notification id="notification"
      theme="primary"
      position="middle"
      .renderer="${this.renderer}"></vaadin-notification>
    `;
  }

  _handleSubmit(event: any) {
    console.log(event.type);
    this.message = event.detail.value;
    console.log(this.message);
    const notification = <NotificationElement>this.renderRoot.querySelector('#notification');
    notification.open();
  }

  renderer = (root: HTMLElement) =>
    render(
      html`
        <div>Message received: ${this.message}</div>
      `,
      root
    );
}
