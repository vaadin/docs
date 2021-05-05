import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridProConnector.js'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line

import { html, LitElement, internalProperty, customElement } from 'lit-element';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro-edit-column';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-pro-styling-editable-cells')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid-pro class="editable-custom-effect" .items="${this.items}">
        <vaadin-grid-column path="firstName"> </vaadin-grid-column>
        <vaadin-grid-column path="lastName"> </vaadin-grid-column>
        <vaadin-grid-column path="membership"></vaadin-grid-column>
        <vaadin-grid-pro-edit-column path="email"></vaadin-grid-pro-edit-column>
      </vaadin-grid-pro>
      <!-- end::snippet[] -->
    `;
  }
}
