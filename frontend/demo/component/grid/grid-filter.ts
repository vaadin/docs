import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty, html } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

type PersonEnhanced = Person & { displayName: string };
@customElement('grid-filter')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private filteredItems: PersonEnhanced[] = [];

  private items: PersonEnhanced[] = [];

  async firstUpdated() {
    const people = (await getPeople()).people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
    this.items = this.filteredItems = people;
  }

  render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <vaadin-text-field
          placeholder="Search"
          style="width: 50%;"
          @value-changed="${(e: CustomEvent) => {
            const value = (e.detail.value as string) || '';
            const filters = value
              .trim()
              .split(' ')
              .map((filter) => new RegExp(filter, 'i'));

            this.filteredItems = this.items.filter(({ displayName, email, profession }) =>
              filters.some(
                (filter) =>
                  filter.test(displayName) || filter.test(email) || filter.test(profession)
              )
            );
          }}"
        >
          <iron-icon slot="prefix" icon="vaadin:search"></iron-icon>
        </vaadin-text-field>
        <vaadin-grid .items="${this.filteredItems}">
          <vaadin-grid-column
            header="Name"
            .renderer="${this.nameRenderer}"
            flex-grow="0"
            width="230px"
          ></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column path="profession"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-vertical-layout>
    `;
  }
  // end::snippet[]

  private nameRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    const person = model.item as Person & { displayName: string };
    render(
      html`
        <vaadin-horizontal-layout style="align-items: center;" theme="spacing">
          <vaadin-avatar img="${person.pictureUrl}" .name="${person.displayName}"></vaadin-avatar>
          <span> ${person.displayName} </span>
        </vaadin-horizontal-layout>
      `,
      root
    );
  };
}
