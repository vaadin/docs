import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import { columnBodyRenderer, columnFooterRenderer } from '@vaadin/grid/lit.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

// tag::snippet[]
interface PersonWithRating extends Person {
  customerRating: number;
}

@customElement('grid-header-footer-styling')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private accessor items: PersonWithRating[] = [];

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
      <vaadin-grid .items="${this.items}" class="styling-header-footer">
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="profession"></vaadin-grid-column>
        <vaadin-grid-column
          header="Customer rating (0-10)"
          header-part-name="rating-header"
          footer-part-name="rating-footer"
          ${columnFooterRenderer(() => html`<span>Avg rating: 5.32</span>`, [])}
          ${columnBodyRenderer(this.ratingRenderer, [])}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private ratingRenderer: GridColumnBodyLitRenderer<PersonWithRating> = (person) => html`
    <span>${this.ratingFormatter.format(person.customerRating)}</span>
  `;
}
// end::snippet[]
