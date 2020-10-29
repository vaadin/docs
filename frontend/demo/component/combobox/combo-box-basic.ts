import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { Country } from '../../domain/Country';
import { getCountries } from '../../domain/DataService';

// tag::snippet[]
@customElement('combo-box-basic')
export class Example extends LitElement {
  @property({ type: Array })
  private items: Country[] = [];

  async firstUpdated() {
    this.items = await getCountries();
  }

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
