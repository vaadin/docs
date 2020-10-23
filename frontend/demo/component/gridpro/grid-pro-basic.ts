import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridProConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, property, customElement } from 'lit-element';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro-edit-column';
import people from '../../../../src/main/resources/data/people.json';

// The examples share the data so let's make a deep clone to avoid side effects in other examples
const peopleCopy = JSON.parse(JSON.stringify(people));

// tag::snippet[]
@customElement('grid-pro-basic')
export class Example extends LitElement {
  @property() items = peopleCopy;

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
