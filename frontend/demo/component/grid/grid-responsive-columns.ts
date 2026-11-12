import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/grid';
import '@vaadin/split-layout';
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import type { Grid } from '@vaadin/grid';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

// tag::snippet[]
const BREAKPOINT_PX = 500;

@customElement('grid-responsive-columns')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @query('vaadin-grid')
  private grid!: Grid<Person>;

  @state()
  private items: Person[] = [];

  @state()
  private wide = true;

  // Toggles the columns whenever the grid is resized
  private resizeObserver = new ResizeObserver(([entry]) => {
    this.wide = entry.contentRect.width >= BREAKPOINT_PX;
  });

  override connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => this.resizeObserver.observe(this.grid));
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.disconnect();
  }

  protected override firstUpdated() {
    getPeople().then(({ people }) => {
      this.items = people;
    });
  }

  protected override render() {
    return html`
      <!-- end::snippet[] -->
      <vaadin-split-layout>
        <!-- tag::snippet[] -->
        <vaadin-grid .items="${this.items}" style="width: 100%">
          <!-- A single column that combines the content when the grid is narrow -->
          <vaadin-grid-column
            header="Employee"
            .hidden="${this.wide}"
            ${columnBodyRenderer(this.employeeRenderer, [])}
          ></vaadin-grid-column>
          <!-- Separate columns for when the grid is wide -->
          <vaadin-grid-column
            header="Name"
            .hidden="${!this.wide}"
            ${columnBodyRenderer(this.nameRenderer, [])}
          ></vaadin-grid-column>
          <vaadin-grid-column path="profession" .hidden="${!this.wide}"></vaadin-grid-column>
          <vaadin-grid-column path="email" .hidden="${!this.wide}"></vaadin-grid-column>
        </vaadin-grid>
        <!-- end::snippet[] -->
        <div></div>
      </vaadin-split-layout>
      <!-- tag::snippet[] -->
    `;
  }

  private employeeRenderer: GridColumnBodyLitRenderer<Person> = (person) => html`
    <b>${person.firstName} ${person.lastName}</b><br />
    <small>${person.email}</small>
  `;

  private nameRenderer: GridColumnBodyLitRenderer<Person> = (person) =>
    html`${person.firstName} ${person.lastName}`;
}
// end::snippet[]
