import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-sort-column.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-sorting')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
  }

  protected override render() {
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
