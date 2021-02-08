import '../../init'; // hidden-full-source-line

import { html, LitElement } from 'lit-element';
import '@vaadin/vaadin-lumo-styles/icons';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

export class Example extends LitElement {
  render() {
    return html`
      <vaadin-notification-card style="justify-content: center; pointer-events: none;">
        <vaadin-vertical-layout theme="spacing" style="align-items: stretch;">
          <h2 style="margin: var(--lumo-space-m) 0 0 0;">New employee</h2>
          <vaadin-vertical-layout style="align-items: stretch;">
            <vaadin-text-field label="First name"></vaadin-text-field>
            <vaadin-text-field label="Last name"></vaadin-text-field>
          </vaadin-vertical-layout>
          <vaadin-horizontal-layout theme="spacing" style="justify-content: flex-end">
            <vaadin-button>
              Cancel
            </vaadin-button>
            <vaadin-button theme="primary">
              Save changes
            </vaadin-button>
          </vaadin-horizontal-layout>
        </vaadin-vertical-layout>
      </vaadin-notification-card>
    `;
  }
}
