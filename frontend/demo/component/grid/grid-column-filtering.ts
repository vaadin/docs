import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-filter-column.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import '@vaadin/horizontal-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

type PersonEnhanced = Person & { displayName: string };

@customElement('grid-column-filtering')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: PersonEnhanced[] = [];

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
        <vaadin-grid-filter-column
          header="Name"
          path="displayName"
          flex-grow="0"
          width="230px"
          ${columnBodyRenderer(this.nameRenderer, [])}
        ></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="email"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="profession"></vaadin-grid-filter-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  }

  private nameRenderer: GridColumnBodyLitRenderer<PersonEnhanced> = (person) => html`
    <vaadin-horizontal-layout style="align-items: center;" theme="spacing">
      <vaadin-avatar img="${person.pictureUrl}" .name="${person.displayName}"></vaadin-avatar>
      <span> ${person.displayName} </span>
    </vaadin-horizontal-layout>
  `;
}
