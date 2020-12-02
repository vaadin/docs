import '../../init'; // hidden-full-source-line

import { html, LitElement } from 'lit-element';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-button/vaadin-button';

const isMac = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].indexOf(window.navigator.platform) > -1;

export class Example extends LitElement {
  render() {
    return html`
      <vaadin-notification-card theme="contrast" style="justify-content: center;">
        5 tasks deleted
        <span style="width: 2em"></span>
        <vaadin-button theme="primary">
          Undo
          <span aria-hidden="true"> &nbsp; ${isMac ? '⌘' : 'Ctrl-'}Z</span>
        </vaadin-button>
      </vaadin-notification-card>
    `;
  }
}
