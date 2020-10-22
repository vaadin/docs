import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';

@customElement('radio-button-vertical')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-radio-group label="Status" theme="vertical">
        <vaadin-radio-button value="pending" checked>Pending</vaadin-radio-button>
        <vaadin-radio-button value="submitted">Submitted</vaadin-radio-button>
        <vaadin-radio-button value="confirmed">Confirmed</vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[] -->
    `;
  }
}
