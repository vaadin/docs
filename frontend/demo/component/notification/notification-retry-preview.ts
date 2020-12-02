import '../../init'; // hidden-full-source-line

import { html, LitElement } from 'lit-element';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-lumo-styles/icons';

export class Example extends LitElement {
  render() {
    return html`
      <vaadin-notification-card theme="error" style="justify-content: center;">
        Failed to generate report
        <span style="width: 2em"></span>
        <vaadin-button theme="tertiary-inline">Retry</vaadin-button>
        <vaadin-button theme="tertiary-inline">
          <iron-icon icon="lumo:cross"></iron-icon>
        </vaadin-button>
      </vaadin-notification-card>
    `;
  }
}
