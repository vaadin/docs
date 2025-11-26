import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/grid';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/tooltip';
import { differenceInYears, parseISO } from 'date-fns';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { GridEventContext } from '@vaadin/grid';
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import { getPeople } from 'Frontend/demo/domain/DataService';
import type Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('grid-tooltip-generator')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  @state()
  private items: Person[] = [];

  protected override async firstUpdated() {
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

  protected override render() {
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
        <vaadin-tooltip slot="tooltip" .generator="${this.tooltipGenerator}"></vaadin-tooltip>
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
        style="padding: 0.25rem"
        theme="badge ${theme}"
      ></vaadin-icon>
    `;
  };
}
