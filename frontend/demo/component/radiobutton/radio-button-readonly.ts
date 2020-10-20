import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';

// tag::snippet[]
@customElement('radio-button-readonly')
export class RadioButtonReadonly extends LitElement {

  render() {
    return html`
      <vaadin-radio-group
        label="Travel Class"
        theme="vertical"
        readonly
      >
        <vaadin-radio-button value="inProgress" checked>In progress</vaadin-radio-button>
        <vaadin-radio-button value="done">Done</vaadin-radio-button>
        <vaadin-radio-button value="cancelled">Cancelled</vaadin-radio-button>
      </vaadin-radio-group>
    `;
  }
}
// end::snippet[]
