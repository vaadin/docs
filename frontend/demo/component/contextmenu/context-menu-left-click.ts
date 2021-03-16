import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line
import './hint-badge'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from 'Frontend/demo/domain/DataService';
import Person from 'Frontend/generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'Frontend/generated/theme';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';
import { ContextMenuOpenedChanged } from '@vaadin/vaadin-context-menu/vaadin-context-menu';

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

  async firstUpdated() {
    this.gridItems = (await getPeople()).people;
  }

  render() {
    return html`
      <hint-badge message="Open the Context Menu by clicking a Grid row."></hint-badge>
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu
        open-on="click"
        .items=${this.items}
        @opened-changed=${(e: ContextMenuOpenedChanged) =>
          (this.contextMenuOpened = e.detail.value)}
      >
        <vaadin-grid .items=${this.gridItems} @click=${this.onClick.bind(this)}>
          <vaadin-grid-column label="First name" path="firstName"></vaadin-grid-column>
          <vaadin-grid-column label="Last name" path="lastName"></vaadin-grid-column>
          <vaadin-grid-column label="Email" path="email"></vaadin-grid-column>
          <vaadin-grid-column label="Phone number" path="address.phone"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  onClick(e: MouseEvent) {
    if (
      !this.contextMenuOpened &&
      ((e.currentTarget as GridElement).getEventContext(e) as GridEventContext).section !== 'body'
    ) {
      e.stopPropagation();
    }
  }
}
