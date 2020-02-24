import '@vaadin/vaadin-grid/vaadin-grid';
import { customElement, html, LitElement, property } from 'lit-element';
import people from '../data/people.json';

@customElement('basic-grid')
export class BasicGrid extends LitElement {
  @property() items = people;

  render() {
    return html`
      <vaadin-grid .items=${this.items}>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}
