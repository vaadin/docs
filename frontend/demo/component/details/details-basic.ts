import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-details/vaadin-details';

// tag::snippet[]
@customElement('details-basic')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-details>
        <div slot="summary">Expandable Details</div>
        Toggle using mouse, Enter and Space keys.
      </vaadin-details>
    `;
  }
}
// end::snippet[]
