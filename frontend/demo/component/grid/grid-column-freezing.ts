import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty, html, query } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import { GridElement, GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-column-freezing')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  @query('vaadin-grid')
  private grid!: GridElement;

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;

    requestAnimationFrame(() => {
      this.grid.recalculateColumnWidths();
    });
  }

  render() {
    return html`
      <vaadin-grid .items=${this.items}>
        <vaadin-grid-column
          header="Name"
          .renderer="${this.nameRenderer}"
          auto-width
          frozen
          flex-grow="0"
        ></vaadin-grid-column>
        <vaadin-grid-column path="email" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="address.phone" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="profession" auto-width></vaadin-grid-column>
        <vaadin-grid-column path="address.street" auto-width></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private nameRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel) => {
    const person = model.item as Person;
    render(
      html`
        <vaadin-horizontal-layout style="align-items: center;">
          <vaadin-avatar
            style="height: var(--lumo-size-m)"
            img="${person.pictureUrl}"
            name="${person.firstName} ${person.lastName}"
            alt="User avatar"
          ></vaadin-avatar>
          <div>${person.firstName} ${person.lastName}</div>
        </vaadin-horizontal-layout>
      `,
      root
    );
  };
}
// end::snippet[]
