import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/combo-box';
import { comboBoxRenderer } from '@vaadin/combo-box/lit.js';
import type { ComboBoxLitRenderer } from '@vaadin/combo-box/lit.js';
import type { ComboBoxFilterChangedEvent } from '@vaadin/combo-box';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('combo-box-presentation')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private allItems: Person[] = [];

  @state()
  private filteredItems: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    const items = people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));

    this.allItems = items;
    this.filteredItems = items;
  }

  protected override render() {
    return html`
      <!-- tag::combobox[] -->
      <vaadin-combo-box
        label="Choose doctor"
        item-label-path="displayName"
        .filteredItems="${this.filteredItems}"
        style="--vaadin-combo-box-overlay-width: 16em"
        @filter-changed="${this.filterChanged}"
        ${comboBoxRenderer(this.renderer, [])}
      ></vaadin-combo-box>
      <!-- end::combobox[] -->
    `;
  }

  private filterChanged(e: ComboBoxFilterChangedEvent) {
    const filter = e.detail.value;
    this.filteredItems = this.allItems.filter(({ firstName, lastName, profession }) =>
      `${firstName} ${lastName} ${profession}`.toLowerCase().includes(filter.toLowerCase())
    );
  }

  // tag::renderer[]
  // NOTE
  // We are using inline styles here to keep the example simple.
  // We recommend placing CSS in a separate style sheet and
  // encapsulating the styling in a new component.

  private renderer: ComboBoxLitRenderer<Person> = (person) => html`
    <div style="display: flex;">
      <img
        style="height: var(--lumo-size-m); margin-right: var(--lumo-space-s);"
        src="${person.pictureUrl}"
        alt="Portrait of ${person.firstName} ${person.lastName}"
      />
      <div>
        ${person.firstName} ${person.lastName}
        <div style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);">
          ${person.profession}
        </div>
      </div>
    </div>
  `;
  // end::renderer[]
}
