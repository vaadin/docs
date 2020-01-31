import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column';
import { LitElement, html, property, customElement } from 'lit-element';
import people from './data/people.json';

@customElement('grid-selection')
export class BasicGrid extends LitElement {
  @property() items = people;

  render() {
    return html`
      <vaadin-grid .items=${this.items}>
        <vaadin-grid-selection-column
          auto-select
          frozen
        ></vaadin-grid-selection-column>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}
