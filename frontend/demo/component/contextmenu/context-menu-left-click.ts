import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import { ContextMenuOpenedChanged } from '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-left-click')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private items = [{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }];
  // end::snippet[]

  @internalProperty()
  private gridItems: Person[] = [];

  private contextMenuOpened?: boolean;

  private onClick = (e: MouseEvent) => {
    // Prevent opening context menu on header row click.
    if (
      !this.contextMenuOpened &&
      ((e.currentTarget as GridElement).getEventContext(e) as GridEventContext).section !== 'body'
    ) {
      e.stopPropagation();
    }
  };

  async firstUpdated() {
    this.gridItems = (await getPeople({ count: 5 })).people;
  }

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu
        open-on="click"
        .items=${this.items}
        @opened-changed=${(e: ContextMenuOpenedChanged) =>
          (this.contextMenuOpened = e.detail.value)}
      >
        <vaadin-grid height-by-rows .items=${this.gridItems} @click=${this.onClick}>
          <vaadin-grid-column path="firstName"></vaadin-grid-column>
          <vaadin-grid-column path="lastName"></vaadin-grid-column>
          <vaadin-grid-column path="email"></vaadin-grid-column>
          <vaadin-grid-column header="Phone number" path="address.phone"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }
}
