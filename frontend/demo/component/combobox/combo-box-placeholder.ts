import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';

@customElement('combo-box-placeholder')
export class Example extends LitElement {
  @property({ type: Array })
  private items: Person[] = [];

  async firstUpdated() {
    this.items = (await getPeople()).map(person => {
      return {
        ...person,
        displayName: `${person.firstName} ${person.lastName}`
      };
    });
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-combo-box
        placeholder="Select employee"
        label="Employee"
        item-label-path="displayName"
        item-value-path="id"
        .items="${this.items}"
      ></vaadin-combo-box>
      <!-- end::snippet[] -->
    `;
  }
}
