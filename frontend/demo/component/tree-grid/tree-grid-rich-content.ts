import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-tree-toggle.js';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/vertical-layout';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { GridDataProviderCallback, GridDataProviderParams } from '@vaadin/grid';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { GridTreeToggleExpandedChangedEvent } from '@vaadin/grid/vaadin-grid-tree-toggle.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('tree-grid-rich-content')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private expandedItems: Person[] = [];

  async dataProvider(
    params: GridDataProviderParams<Person>,
    callback: GridDataProviderCallback<Person>
  ) {
    const { people, hierarchyLevelSize } = await getPeople({
      count: params.pageSize,
      startIndex: params.page * params.pageSize,
      managerId: params.parentItem ? params.parentItem.id : null,
    });

    callback(people, hierarchyLevelSize);
  }

  // tag::snippet[]
  private employeeRenderer: GridColumnBodyLitRenderer<Person> = (person, model) => html`
    <vaadin-grid-tree-toggle
      .leaf="${!person.manager}"
      .level="${model.level ?? 0}"
      @expanded-changed="${(e: GridTreeToggleExpandedChangedEvent) => {
        if (e.detail.value) {
          this.expandedItems = [...this.expandedItems, person];
        } else {
          this.expandedItems = this.expandedItems.filter((p) => p.id !== person.id);
        }
      }}"
      .expanded="${!!model.expanded}"
    >
      <div class="person-item">
        <vaadin-avatar
          .img="${person.pictureUrl}"
          .name="${`${person.firstName} ${person.lastName}`}"
          style="--vaadin-avatar-size: 2.25rem"
        ></vaadin-avatar>
        <span>${person.firstName} ${person.lastName}</span>
        <span>${person.profession}</span>
      </div>
    </vaadin-grid-tree-toggle>
  `;

  private contactRenderer: GridColumnBodyLitRenderer<Person> = (person) => html`
    <vaadin-vertical-layout style="font-size: .875rem; line-height: 1.625;">
      <a href="mailto:${person.email}" style="align-items: center; display: flex;">
        <vaadin-icon
          icon="vaadin:envelope"
          style="width: 1.25em; height: 1.25em; margin-inline-end: var(--vaadin-gap-s);"
        ></vaadin-icon>
        <span>${person.email}</span>
      </a>
      <a href="tel:${person.address.phone}" style="align-items: center; display: flex;">
        <vaadin-icon
          icon="vaadin:phone"
          style="width: 1.25em; height: 1.25em; margin-inline-end: var(--vaadin-gap-s);"
        ></vaadin-icon>
        <span>${person.address.phone}</span>
      </a>
    </vaadin-vertical-layout>
  `;

  protected override render() {
    return html`
      <vaadin-grid .dataProvider="${this.dataProvider}" .expandedItems="${this.expandedItems}">
        <vaadin-grid-column
          auto-width
          header="Employee"
          ${columnBodyRenderer(this.employeeRenderer, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column
          auto-width
          header="Contact"
          ${columnBodyRenderer(this.contactRenderer, [])}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }
  // end::snippet[]
}
