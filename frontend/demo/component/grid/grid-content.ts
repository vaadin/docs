import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/avatar';
import '@vaadin/badge';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import { applyTheme } from 'Frontend/demo/theme';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';

@customElement('grid-content')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: Person[] | undefined;

  protected override async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  protected override render() {
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-selection-column></vaadin-grid-selection-column>
        <vaadin-grid-column
          header="Employee"
          flex-grow="0"
          auto-width
          ${columnBodyRenderer(this.employeeRenderer, [])}
        ></vaadin-grid-column>
        <vaadin-grid-column path="profession" auto-width></vaadin-grid-column>
        <vaadin-grid-column
          header="Status"
          auto-width
          ${columnBodyRenderer(this.statusRenderer, [])}
        ></vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  private employeeRenderer: GridColumnBodyLitRenderer<Person> = (person) => html`
    <div class="person-item">
      <vaadin-avatar
        img="${person.pictureUrl}"
        name="${person.firstName} ${person.lastName}"
      ></vaadin-avatar>
      <span>${person.firstName} ${person.lastName}</span>
      <span>${person.email}</span>
    </div>
  `;

  private statusRenderer: GridColumnBodyLitRenderer<Person> = ({ status }) => html`
    <vaadin-badge theme="${status === 'Available' ? 'success' : 'error'}">${status}</vaadin-badge>
  `;
  // end::snippet[]
}
