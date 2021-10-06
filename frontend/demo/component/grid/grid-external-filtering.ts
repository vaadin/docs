import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout';
import { TextFieldValueChangedEvent } from '@vaadin/vaadin-text-field';
import type { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

type PersonEnhanced = Person & { displayName: string };

@customElement('grid-external-filtering')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
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
          @value-changed="${(e: TextFieldValueChangedEvent) => {
            const searchTerm = ((e.detail.value as string) || '').trim();
            const matchesTerm = (value: string) => {
              return value.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
            };

            this.filteredItems = this.items.filter(({ displayName, email, profession }) => {
              return (
                !searchTerm ||
                matchesTerm(displayName) ||
                matchesTerm(email) ||
                matchesTerm(profession)
              );
            });
          }}"
        >
          <vaadin-icon slot="prefix" icon="vaadin:search"></vaadin-icon>
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

  private nameRenderer = (
    root: HTMLElement,
    _: HTMLElement,
    model: GridItemModel<Person & { displayName: string }>
  ) => {
    const person = model.item;
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
