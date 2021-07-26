import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import type { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-column-filtering')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  async firstUpdated() {
    const people = (await getPeople()).people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
    this.items = people;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-filter-column
          header="Name"
          path="displayName"
          .renderer="${this.nameRenderer}"
          flex-grow="0"
          width="230px"
        ></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="email"></vaadin-grid-filter-column>
        <vaadin-grid-filter-column path="profession"></vaadin-grid-filter-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  }

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
