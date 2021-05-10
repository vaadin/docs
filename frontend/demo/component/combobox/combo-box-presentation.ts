import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { ComboBoxItemModel } from '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { render } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('combo-box-presentation')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private allItems: Person[] = [];

  @internalProperty()
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

  private renderer(root: HTMLElement, _: HTMLElement, { item }: ComboBoxItemModel) {
    const person = item as Person;
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
  }
  // end::renderer[]
}
