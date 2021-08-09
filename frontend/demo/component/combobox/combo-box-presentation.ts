import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { ComboBoxRenderer } from '@vaadin/vaadin-combo-box/vaadin-combo-box';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('combo-box-presentation')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private allItems: Person[] = [];

  @state()
  private filteredItems: Person[] = [];

  async firstUpdated() {
    this.allItems = this.filteredItems = (await getPeople()).people.map((person) => {
      return {
        ...person,
        displayName: `${person.firstName} ${person.lastName}`,
      };
    });
  }

  render() {
    return html`
      <!-- tag::combobox[] -->
      <vaadin-combo-box
        label="Choose doctor"
        item-label-path="displayName"
        .filteredItems="${this.filteredItems}"
        .renderer="${this.renderer}"
        style="--vaadin-combo-box-overlay-width: 16em"
        @filter-changed="${this.filterChanged}"
      ></vaadin-combo-box>
      <!-- end::combobox[] -->
    `;
  }

  private filterChanged(e: CustomEvent) {
    const filter = e.detail.value as string;
    this.filteredItems = this.allItems.filter(({ firstName, lastName, profession }) => {
      return `${firstName} ${lastName} ${profession}`.toLowerCase().includes(filter.toLowerCase());
    });
  }

  // tag::renderer[]
  // NOTE
  // We are using inline styles here to keep the example simple.
  // We recommend placing CSS in a separate style sheet and
  // encapsulating the styling in a new component.

  private renderer: ComboBoxRenderer<Person> = (root, _, { item: person }) => {
    render(
      html`
        <div style="display: flex;">
          <img
            style="height: var(--lumo-size-m); margin-right: var(--lumo-space-s);"
            src="${person.pictureUrl}"
            alt="Portrait of ${person.firstName} ${person.lastName}"
          />
          <div>
            ${person.firstName} ${person.lastName}
            <div
              style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);"
            >
              ${person.profession}
            </div>
          </div>
        </div>
      `,
      root
    );
  };
  // end::renderer[]
}
