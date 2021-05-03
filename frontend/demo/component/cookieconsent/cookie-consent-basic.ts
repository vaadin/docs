import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line
import './example-cleanup'; // hidden-full-source-line
import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-cookie-consent/vaadin-cookie-consent';

@customElement('cookie-consent-basic')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-cookie-consent></vaadin-cookie-consent>
      <!-- end::snippet[] -->
    `;
  }
}
