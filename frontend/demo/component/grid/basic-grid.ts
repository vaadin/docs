import { customElement, html, LitElement, property } from 'lit-element';
import '../../../vaadin-connect-example'; // hidden-full-source-line
import '@vaadin/vaadin-grid/vaadin-grid';
import people from '../../../data/people.json';

// tag::snippet[]
@customElement('basic-grid')
export class BasicGrid extends LitElement {
  @property() items = people;

  render() {
    return html`
      <vaadin-grid .items=${this.items}>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}
// end::snippet[]
