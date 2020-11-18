import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/datepickerConnector'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';

// tag::snippet[]
@customElement('date-picker-basic')
export class Example extends LitElement {
  render() {
    return html`
      <vaadin-date-picker label="Birthday"></vaadin-date-picker>
    `;
  }
}
// end::snippet[]
