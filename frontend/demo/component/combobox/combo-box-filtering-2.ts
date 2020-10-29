import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import countries from '../../../../src/main/resources/data/countries.json';

// tag::snippet[]
@customElement('combo-box-filtering-2')
export class Example extends LitElement {
  @property() items = countries;

  render() {
    return html`
      <vaadin-combo-box
        label="Country"
        item-label-path="country"
        item-value-path="id"
        .items=${this.items}
      ></vaadin-combo-box>
    `;
  }
}
// end::snippet[]
