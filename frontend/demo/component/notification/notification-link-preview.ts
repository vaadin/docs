import '../../init'; // hidden-full-source-line

import { html, LitElement } from 'lit-element';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';

export class Example extends LitElement {
  render() {
    return html`
      <vaadin-notification-card style="justify-content: center;">
        <div>Jason Bailey mentioned you in <a href="#">Project Q4</a></div>
        <vaadin-button theme="tertiary-inline">
          <iron-icon icon="lumo:cross"></iron-icon>
        </vaadin-button>
      </vaadin-notification-card>
    `;
  }
}
