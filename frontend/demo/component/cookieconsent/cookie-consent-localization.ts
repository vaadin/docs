import 'Frontend/demo/init'; // hidden-source-line
import './example-cleanup'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-cookie-consent/vaadin-cookie-consent';

@customElement('cookie-consent-localization')
export class Example extends LitElement {
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
