import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { guard } from 'lit/directives/guard.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { format } from 'date-fns';

@customElement('grid-column-alignment')
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

  randomDate() {
    const futureDate = new Date(Date.now() + Math.floor(Math.random() * 10000000000));
    return format(futureDate, 'P');
  }

  randomAmount() {
    return Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' }).format(
      Math.floor(Math.random() * 1000000)
    );
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column path="displayName" header="Name"></vaadin-grid-column>
        <vaadin-grid-column
          header="Due"
          .renderer="${guard(
            [],
            () => (root: HTMLElement) => render(html`<span>${this.randomDate()}</span>`, root)
          )}"
        ></vaadin-grid-column>
        <vaadin-grid-column
          header="Amount"
          text-align="end"
          .renderer="${guard([], () => (root: HTMLElement) => {
            render(
              html`<span style="font-variant-numeric: tabular-nums">${this.randomAmount()}</span>`,
              root
            );
          })}"
        ></vaadin-grid-column>
      </vaadin-grid>
      <!-- end::snippet[] -->
    `;
  }
}
