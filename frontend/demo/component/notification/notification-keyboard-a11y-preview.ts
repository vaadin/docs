import '../../init'; // hidden-full-source-line

import { html, LitElement } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-notification/vaadin-notification';

const isMac = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].indexOf(window.navigator.platform) > -1;

export class Example extends LitElement {
  render() {
    return html`
      <vaadin-notification-card theme="contrast" slot="middle">
        <div>5 tasks deleted</div>
        <div style="width: 2em"></div>
        <vaadin-button theme="primary">
          Undo
          <span aria-hidden="true"> &nbsp; ${isMac ? '⌘' : 'Ctrl-'}Z</span>
        </vaadin-button>
      </vaadin-notification-card>
    `;
  }
}
