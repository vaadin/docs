import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridProConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, property, customElement } from 'lit-element';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro-edit-column';
import { Person } from '../../domain/Person';
import { getPeople } from '../../domain/DataService';

// tag::snippet[]
@customElement('grid-pro-basic')
export class Example extends LitElement {
  @property({ type: Array })
  private items: Person[] = [];

  async firstUpdated() {
    this.items = await getPeople();
  }

  render() {
    return html`
      <vaadin-grid-pro .items=${this.items}>
        <vaadin-grid-pro-edit-column path="firstName"> </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="lastName"> </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column
          path="membership"
          editor-type="select"
          .editorOptions=${['Regular', 'Premium', 'VIP']}
        >
        </vaadin-grid-pro-edit-column>
        <vaadin-grid-pro-edit-column path="subscriber" editor-type="checkbox">
        </vaadin-grid-pro-edit-column>
      </vaadin-grid-pro>
    `;
  }
}
// end::snippet[]
