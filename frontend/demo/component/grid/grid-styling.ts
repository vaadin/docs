import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line (Grid's connector)

import { customElement, LitElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-grid/vaadin-grid';
import { GridColumnElement, GridItemModel } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { render, html } from 'lit-html';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
@customElement('grid-styling')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private items: Person[] = [];

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people.map((person) => ({ ...person, customerRating: Math.random() * 10 }));
  }

  render() {
    return html`
      <vaadin-grid .items="${this.items}" .cellClassNameGenerator="${this.cellClassNameGenerator}">
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="profession"></vaadin-grid-column>
        <vaadin-grid-column
          header="Customer rating (0-10)"
          .renderer=${this.ratingRenderer}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private ratingRenderer = (
    root: HTMLElement,
    _column?: GridColumnElement,
    model?: GridItemModel
  ) => {
    const rating = (model?.item as any).customerRating.toFixed(2);
    render(html` <span>${rating}</span> `, root);
  };

  private cellClassNameGenerator(column: GridColumnElement, model: GridItemModel) {
    let classes = '';
    // make the customer rating column bold
    if (column.header?.startsWith('Customer rating')) {
      classes += ' font-weight-bold';
    }
    // add high-rating class to customer ratings of 8 or higher
    if ((model.item as any).customerRating >= 8.0) {
      classes += ' high-rating';
      // add low-rating class to customer ratings of 4 or lower
    } else if ((model.item as any).customerRating <= 4.0) {
      classes += ' low-rating';
    }
    return classes;
  }
}
// end::snippet[]
