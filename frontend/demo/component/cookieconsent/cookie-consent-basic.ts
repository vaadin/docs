import 'Frontend/demo/init'; // hidden-source-line
import './example-cleanup'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
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
