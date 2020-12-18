import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-details/vaadin-details';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';

// tag::snippet[]
@customElement('details-basic')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-details opened>
        <div slot="summary">Contact information</div>

        <vaadin-vertical-layout>
          <span>Sophia Williams</span>
          <span>sophia.williams@company.com</span>
          <span>(501) 555-9128</span>
        </vaadin-vertical-layout>
      </vaadin-details>
    `;
  }
}
// end::snippet[]
