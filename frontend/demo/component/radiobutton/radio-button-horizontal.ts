import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';

@customElement('radio-button-horizontal')
export class Example extends LitElement {
  render() {
    return html`
      <!-- tag::snippet[]-->
      <vaadin-radio-group label="Travel Class" theme="horizontal">
        <vaadin-radio-button checked>Pending</vaadin-radio-button>
        <vaadin-radio-button>Submitted</vaadin-radio-button>
        <vaadin-radio-button>Confirmed</vaadin-radio-button>
        <vaadin-radio-button>Failed</vaadin-radio-button>
        <vaadin-radio-button>Cancelled</vaadin-radio-button>
      </vaadin-radio-group>
      <!-- end::snippet[]-->
    `;
  }
}
