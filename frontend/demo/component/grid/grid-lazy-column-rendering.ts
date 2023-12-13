import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import type { GridBodyRenderer } from '@vaadin/grid';

@customElement('grid-lazy-column-rendering')
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
    this.items = people;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-grid .items="${this.items}" column-rendering="lazy">
        <!-- end::snippet[] -->
        <vaadin-grid-column frozen .renderer="${this.indexColumnRenderer}"></vaadin-grid-column>

        ${[...Array(100).keys()].map((index) => {
          // Generate 100 columns
          return html`
            <vaadin-grid-column
              data-index="${index}"
              .header="${`Col ${index}`}"
              .renderer="${this.columnRenderer}"
            ></vaadin-grid-column>
          `;
        })}
      </vaadin-grid>
    `;
  }

  private columnRenderer: GridBodyRenderer<Person> = (root, column, { index }) => {
    root.textContent = `${column.dataset.index} - ${index}`;
  };

  private indexColumnRenderer: GridBodyRenderer<Person> = (root, _, { index }) => {
    root.textContent = 'Row ' + index;
  };
}
