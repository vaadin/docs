import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';

// tag::snippet[]
@customElement('my-view')
export class MyView extends LitElement {
  @query('#notification')
  private notification: any;

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
      <vaadin-button theme="primary" @click="${this.clickHandler}"> Click me </vaadin-button>
      <vaadin-notification id="notification" duration="2000">
        <template>Hello, World!</template>
      </vaadin-notification>
    `;
  }

  private clickHandler() {
    this.notification.open();
  }
}
// end::snippet[]
