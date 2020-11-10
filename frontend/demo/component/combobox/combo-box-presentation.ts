import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/comboBoxConnector'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { Person } from '../../domain/Person';
import { getPeople } from '../../domain/DataService';
import { ComboBoxItemModel } from '@vaadin/vaadin-combo-box/vaadin-combo-box';
import { render } from 'lit-html';

// tag::snippet[]
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
      <vaadin-combo-box
        label="Choose doctor"
        .itemLabelPath=${'displayName'}
        .filteredItems=${this.filteredItems}
        .renderer=${this.renderer}
        style="--vaadin-combo-box-overlay-width: 250px"
        @filter-changed=${this.filterChanged}
      ></vaadin-combo-box>
    `;
  }

  private filterChanged(e: CustomEvent) {
    const filter = e.detail.value as string;
    this.filteredItems = this.allItems.filter(({ firstName, lastName, profession }) => {
      return `${firstName} ${lastName} ${profession}`.toLowerCase().includes(filter.toLowerCase());
    });
  }

  private renderer(root: HTMLElement, _: HTMLElement, { item }: ComboBoxItemModel) {
    const person = item as Person;
    render(
      html`
        <div style="display: flex;">
          <img style="height: 2em" src=${person.pictureUrl} alt="User avatar" />
          <div>
            ${person.firstName} ${person.lastName}
            <div>${person.profession}</div>
          </div>
        </div>
      `,
      root
    );
  }
}
// end::snippet[]
