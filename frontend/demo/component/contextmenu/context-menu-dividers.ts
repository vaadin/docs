import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line
import './hint-badge'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import { getPeople } from '../../domain/DataService';
import Person from '../../../generated/com/vaadin/demo/domain/Person';
import { applyTheme } from 'generated/theme';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';

@customElement('context-menu-dividers')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  @internalProperty()
  private gridItems: Person[] = [];

  async firstUpdated() {
    this.gridItems = await getPeople();
  }

  render() {
    return html`
      <hint-badge></hint-badge>
      <!-- tag::snippet[] -->
      <vaadin-context-menu
        .items=${[
          { text: 'View' },
          { component: 'hr' },
          { text: 'Edit' },
          { text: 'Delete' },
          { component: 'hr' },
          { text: 'Email' },
          { text: 'Call' }
        ]}
      >
        <vaadin-grid .items=${this.gridItems} @vaadin-contextmenu=${this.onContextMenu}>
          <vaadin-grid-column label="First name" path="firstName"></vaadin-grid-column>
          <vaadin-grid-column label="Last name" path="lastName"></vaadin-grid-column>
          <vaadin-grid-column label="Email" path="email"></vaadin-grid-column>
          <vaadin-grid-column label="Phone number" path="address.phone"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippet[] -->
    `;
  }

  onContextMenu(e: MouseEvent) {
    if (
      ((e.currentTarget as GridElement).getEventContext(e) as GridEventContext).section !== 'body'
    ) {
      e.stopPropagation();
    }
  }
}
