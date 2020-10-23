import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import countries from '../../../data/countries.json';

// tag::snippet[]
@customElement('combo-box-auto-open')
export class Example extends LitElement {
  @property() items = countries;

  render() {
    return html`
      <vaadin-combo-box
        label="Country"
        item-label-path="country"
        item-value-path="id"
        .items=${this.items}
        auto-open-disabled
      ></vaadin-combo-box>
    `;
  }
}
// end::snippet[]
