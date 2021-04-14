import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-cookie-consent/vaadin-cookie-consent';
import ExampleMixin from './example-base';

@customElement('cookie-consent-basic')
export class Example extends ExampleMixin(LitElement) {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-cookie-consent></vaadin-cookie-consent>
      <!-- end::snippet[] -->
    `;
  }
}
