import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/avatar';
import '@vaadin/button';
import '@vaadin/grid';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import type { TextFieldValueChangedEvent } from '@vaadin/text-field';
import '@vaadin/vertical-layout';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

type PersonEnhanced = Person & { displayName: string };

@customElement('grid-external-filtering')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private filteredItems: PersonEnhanced[] = [];

  private items: PersonEnhanced[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    const items = people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
    this.items = items;
    this.filteredItems = items;
  }

  protected override render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <vaadin-text-field
          placeholder="Search"
          style="width: 50%;"
          @value-changed="${(e: TextFieldValueChangedEvent) => {
            const searchTerm = (e.detail.value || '').trim();
            const matchesTerm = (value: string) =>
              value.toLowerCase().includes(searchTerm.toLowerCase());

            this.filteredItems = this.items.filter(
              ({ displayName, email, profession }) =>
                !searchTerm ||
                matchesTerm(displayName) ||
                matchesTerm(email) ||
                matchesTerm(profession)
            );
          }}"
        >
          <vaadin-icon slot="prefix" icon="vaadin:search"></vaadin-icon>
        </vaadin-text-field>
        <vaadin-grid .items="${this.filteredItems}">
          <vaadin-grid-column
            header="Name"
            flex-grow="0"
            width="230px"
            ${columnBodyRenderer(this.nameRenderer, [])}
          ></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column path="profession"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-vertical-layout>
    `;
  }
  // end::snippet[]

  private nameRenderer: GridColumnBodyLitRenderer<PersonEnhanced> = (person) => html`
    <vaadin-horizontal-layout style="align-items: center;" theme="spacing">
      <vaadin-avatar img="${person.pictureUrl}" .name="${person.displayName}"></vaadin-avatar>
      <span> ${person.displayName} </span>
    </vaadin-horizontal-layout>
  `;
}
