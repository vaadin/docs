import '../../init'; // hidden-full-source-line

import { html, LitElement } from 'lit-element';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';

export class Example extends LitElement {
  render() {
    return html`
      <vaadin-notification-card theme="primary" style="justify-content: center;">
        New project plan available
        <vaadin-button theme="tertiary-inline">
          <iron-icon icon="lumo:cross"></iron-icon>
        </vaadin-button>
      </vaadin-notification-card>
    `;
  }
}
