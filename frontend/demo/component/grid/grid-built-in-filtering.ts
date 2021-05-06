import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty, html } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-filter-column';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-build-in-filtering')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
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
