import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-cookie-consent/vaadin-cookie-consent';

// tag::snippet[]
@customElement('cookie-consent-theming')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-cookie-consent></vaadin-cookie-consent>
    `;
  }
}
// end::snippet[]
