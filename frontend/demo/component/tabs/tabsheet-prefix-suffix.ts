import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/tabs';

@customElement('tabsheet-prefix-suffix')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      Tabsheet example
      <!-- end::snippet[] -->
    `;
  }
}
