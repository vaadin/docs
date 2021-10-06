import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column-group';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-column-grouping')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  render() {
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column-group header="Name">
          <vaadin-grid-column path="firstName"></vaadin-grid-column>
          <vaadin-grid-column path="lastName"></vaadin-grid-column>
        </vaadin-grid-column-group>
        <vaadin-grid-column-group header="Address">
          <vaadin-grid-column path="address.street"></vaadin-grid-column>
          <vaadin-grid-column path="address.city"></vaadin-grid-column>
          <vaadin-grid-column path="address.zip"></vaadin-grid-column>
          <vaadin-grid-column path="address.state"></vaadin-grid-column>
        </vaadin-grid-column-group>
      </vaadin-grid>
    `;
  }
}
// end::snippet[]
