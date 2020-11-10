import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { Person } from '../../domain/Person';
import { getPeople } from '../../domain/DataService';
import { ComboBoxItemModel } from '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { render } from 'lit-html';

@customElement('combo-box-presentation')
export class Example extends LitElement {
  @property({ type: Array })
  private allItems: Person[] = [];

  @property({ type: Array })
  private filteredItems: Person[] = [];

  async firstUpdated() {
    this.allItems = this.filteredItems = (await getPeople()).map((person) => {
      return {
        ...person,
        displayName: `${person.firstName} ${person.lastName}`
      };
    });
  }

  render() {
    return html`
      <!-- tag::combobox[] -->
      <vaadin-combo-box
        label="Choose doctor"
        .itemLabelPath="displayName"
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

  // ...

  // NOTE
  // We are using inline styles here to keep the example simple.
  // We recommend placing CSS in a separate style sheet and
  // encapsulating the styling in a new component.

  private renderer(root: HTMLElement, _: HTMLElement, { item }: ComboBoxItemModel) {
    const person = item as Person;
    render(
      html`
        <div style="display: flex;">
          <img style="height: var(--lumo-size-m); margin-right: var(--lumo-space-s);" src=${person.pictureUrl} alt="Portrait of ${person.firstName} ${person.lastName}" />
          <div>
            ${person.firstName} ${person.lastName}
            <div style="font-size: var(--lumo-font-size-s); color: var(--lumo-secondary-text-color);">
              ${person.profession}
            </div>
          </div>
        </div>
      `,
      root
    );
  }
}
// end::renderer[]
