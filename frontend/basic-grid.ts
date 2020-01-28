import '@vaadin/vaadin-grid/all-imports';
import { LitElement, html, property, customElement } from 'lit-element';

@customElement('basic-grid')
export class BasicGrid extends LitElement {
  @property() items: any;

  firstUpdated() {
    fetch('https://demo.vaadin.com/demo-data/1.0/people?count=200')
      .then(res => res.json())
      .then(json => {
        this.items = json.result;
        this.requestUpdate();
      });
  }

  render() {
    return html`
      <vaadin-grid .items=${this.items}>
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
}
