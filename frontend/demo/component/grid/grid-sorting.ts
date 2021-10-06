import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-sorting')
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
    const people = (await getPeople()).people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
    this.items = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-sort-column path="id"></vaadin-grid-sort-column>
        <vaadin-grid-sort-column path="displayName" header="Name"></vaadin-grid-sort-column>
        <vaadin-grid-sort-column path="email"></vaadin-grid-sort-column>
        <vaadin-grid-sort-column path="profession"></vaadin-grid-sort-column>
        <vaadin-grid-sort-column path="birthday"></vaadin-grid-sort-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  }
}
