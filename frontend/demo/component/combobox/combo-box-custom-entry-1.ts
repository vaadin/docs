import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import states from '../../../../src/main/resources/data/states.json';

// tag::snippet[]
@customElement('combo-box-custom-entry-1')
export class Example extends LitElement {
  @property() items = states;

  render() {
    return html`
      <vaadin-combo-box
        label="State"
        item-label-path="name"
        item-value-path="id"
        .items=${this.items}
        allow-custom-value
      ></vaadin-combo-box>
    `;
  }
}
// end::snippet[]
