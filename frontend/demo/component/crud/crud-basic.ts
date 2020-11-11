import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
@customElement('crud-basic')
export class Example extends LitElement {
  @property({ type: Array })
  private items: Person[] = [];

  async firstUpdated() {
    this.items = await getPeople();
  }

  render() {
    return html` <vaadin-crud include="firstName, lastName" .items=${this.items}></vaadin-crud> `;
  }
}
// end::snippet[]
