import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import type { GridColumn, GridItemModel } from '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
interface PersonWithRating extends Person {
  customerRating: number;
}

@customElement('grid-styling')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: PersonWithRating[] = [];

  private ratingFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people.map((person) => ({ ...person, customerRating: Math.random() * 10 }));
  }

  protected override render() {
    return html`
      <vaadin-grid .items="${this.items}" .cellClassNameGenerator="${this.cellClassNameGenerator}">
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="profession"></vaadin-grid-column>
        <vaadin-grid-column
          header="Customer rating (0-10)"
          ${columnBodyRenderer(this.ratingRenderer, [])}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private ratingRenderer: GridColumnBodyLitRenderer<PersonWithRating> = (person) => html`
    <span>${this.ratingFormatter.format(person.customerRating)}</span>
  `;

  private cellClassNameGenerator(column: GridColumn, model: GridItemModel<PersonWithRating>) {
    const item = model.item;
    let classes = '';
    // Make the customer rating column bold
    if (column.header?.startsWith('Customer rating')) {
      classes += ' font-weight-bold';
    }
    // Add high-rating class to customer ratings of 8 or higher
    if (item.customerRating >= 8.0) {
      classes += ' high-rating';
      // Add low-rating class to customer ratings of 4 or lower
    } else if (item.customerRating <= 4.0) {
      classes += ' low-rating';
    }
    return classes;
  }
}
// end::snippet[]
