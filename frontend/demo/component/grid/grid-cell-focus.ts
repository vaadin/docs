import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line (Grid's connector)

import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-text-field/vaadin-text-area';
import type { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';
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
  private grid!: GridElement;
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
        .items="${this.items}"
        @cell-focus="${(e: CustomEvent) => {
          const eventContext = this.grid.getEventContext(e) as GridEventContext<Person>;
          const section = eventContext?.section || 'Not available';
          const row = eventContext?.index != undefined ? eventContext?.index : 'Not available';
          const column = eventContext?.column?.path || 'Not available';
          const person =
            eventContext?.item?.firstName && eventContext?.item?.firstName
              ? `${eventContext.item.firstName} ${eventContext.item.lastName}`
              : 'Not available';

          this.eventSummary = `Section: ${section}\nRow: ${row}\nColumn: ${column}\nPerson: ${person}`;
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
          placeholder="Focus a cell to see event information"
          .value="${this.eventSummary}"
        ></vaadin-text-area>
      </div>
    `;
  }
  // end::snippet[]
}
