import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-cookie-consent/vaadin-cookie-consent';
import ExampleMixin from './example-base';

@customElement('cookie-consent-localization')
export class Example extends ExampleMixin(LitElement) {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-cookie-consent
        message="Tämä sivusto käyttää evästeitä parhaan kokemuksen tarjoamiseksi"
        dismiss="Selvä"
        learn-more="Lue lisää"
        learn-more-link="https://vaadin.com/terms-of-service"
      ></vaadin-cookie-consent>
      <!-- end::snippet[] -->
    `;
  }
}
