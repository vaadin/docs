import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import type { GridCellFocusEvent, GridElement } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-cell-focus')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  static get styles() {
    return css`
      vaadin-text-area {
        width: 100%;
      }
    `;
  }

  @query('vaadin-grid')
  private grid!: GridElement<Person>;
  @state()
  private items: Person[] = [];
  @state()
  private eventSummary?: string;

  async firstUpdated() {
    const { people } = await getPeople();
    this.items = people;
  }

  // tag::snippet[]
  render() {
    return html`
      <vaadin-grid
        theme="force-focus-outline"
        .items="${this.items}"
        @cell-focus="${(e: GridCellFocusEvent<Person>) => {
          const eventContext = this.grid.getEventContext(e);
          const section = eventContext.section || 'Not available';
          const row = eventContext.index != undefined ? eventContext.index : 'Not available';
          const column = eventContext.column?.path || 'Not available';
          const person = eventContext.item;
          const fullName =
            person?.firstName && person?.lastName
              ? `${person.firstName} ${person.lastName}`
              : 'Not available';

          this.eventSummary = `Section: ${section}\nRow: ${row}\nColumn: ${column}\nPerson: ${fullName}`;
        }}"
      >
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="email"></vaadin-grid-column>
        <vaadin-grid-column path="profession"></vaadin-grid-column>
      </vaadin-grid>
      <div>
        <vaadin-text-area
          label="Cell focus event information"
          readonly
          .value="${this.eventSummary}"
        ></vaadin-text-area>
      </div>
    `;
  }

  // end::snippet[]
}
