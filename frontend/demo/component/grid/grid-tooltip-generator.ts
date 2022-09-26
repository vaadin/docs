import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import type { GridEventContext } from '@vaadin/grid';
import { columnBodyRenderer, GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { differenceInYears, parseISO } from 'date-fns';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('grid-tooltip-generator')
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
    const { people } = await getPeople();
    this.items = people;
  }

  // tag::snippet[]
  private tooltipGenerator = (context: GridEventContext<Person>): string => {
    let text = '';

    const { column, item } = context;
    if (column && item) {
      switch (column.path) {
        case 'birthday':
          text = `Age: ${differenceInYears(Date.now(), parseISO(item.birthday))}`;
          break;
        case 'status':
          text = item.status;
          break;
        default:
          break;
      }
    }

    return text;
  };
  // end::snippet[]

  render() {
    return html`
      <vaadin-grid .items="${this.items}">
        <vaadin-grid-column path="firstName"></vaadin-grid-column>
        <vaadin-grid-column path="lastName"></vaadin-grid-column>
        <vaadin-grid-column path="birthday"></vaadin-grid-column>
        <vaadin-grid-column
          path="status"
          ${columnBodyRenderer(this.statusRenderer, [])}
        ></vaadin-grid-column>
        <!-- tag::snippethtml[] -->
        <vaadin-tooltip slot="tooltip" .textGenerator="${this.tooltipGenerator}"></vaadin-tooltip>
        <!-- end::snippethtml[] -->
      </vaadin-grid>
    `;
  }

  private statusRenderer: GridColumnBodyLitRenderer<Person> = ({ status }) => {
    const icon = status === 'Available' ? 'check' : 'close-small';
    const theme = status === 'Available' ? 'success' : 'error';

    return html`
      <vaadin-icon
        icon="vaadin:${icon}"
        style="padding: var(--lumo-space-xs)"
        theme="badge ${theme}"
      ></vaadin-icon>
    `;
  };
}
