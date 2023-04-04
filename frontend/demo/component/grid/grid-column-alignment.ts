import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { format } from 'date-fns';

@customElement('grid-column-alignment')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people.map((person) => ({
      ...person,
      displayName: `${person.firstName} ${person.lastName}`,
    }));
  }

  randomDate() {
    const futureDate = new Date(Date.now() + Math.floor(Math.random() * 10000000000));
    return format(futureDate, 'P');
  }

  randomAmount() {
    return Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' }).format(
      Math.floor(Math.random() * 1000000)
    );
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column path="displayName" header="Name"></vaadin-grid-column>
        <vaadin-grid-column
          header="Due"
          ${columnBodyRenderer(() => html`<span>${this.randomDate()}</span>`, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column
          header="Amount"
          text-align="end"
          ${columnBodyRenderer(
            () => html`
              <span style="font-variant-numeric: tabular-nums">${this.randomAmount()}</span>
            `,
            []
          )}
        ></vaadin-grid-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  }
}
