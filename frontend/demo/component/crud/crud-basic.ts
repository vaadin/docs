import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-crud/vaadin-crud';
import people from '../../../../src/main/resources/data/people.json';

// The examples share the data so let's make a deep clone to avoid side effects in other examples
const peopleCopy = JSON.parse(JSON.stringify(people));

// tag::snippet[]
@customElement('crud-basic')
export class Example extends LitElement {
  @property() items = peopleCopy;

  render() {
    return html`
      <vaadin-crud
        include="firstName, lastName"
        .items=${this.items}
      ></vaadin-crud>
    `;
  }
}
// end::snippet[]
