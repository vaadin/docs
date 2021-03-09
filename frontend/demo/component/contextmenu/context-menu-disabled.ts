import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line
import './hint-badge'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import { applyTheme } from 'generated/theme';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';

@customElement('context-menu-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private items = [
    { text: 'Preview', disabled: true },
    { text: 'Edit' },
    { component: 'hr' },
    {
      text: 'Export',
      children: [
        { text: 'PDF Document', disabled: true },
        { text: 'Rich Text Format' },
        { text: 'Plain Text' }
      ]
    },
    { text: 'Share', children: [{ text: 'Copy link' }, { text: 'Vaadin' }] },
    { component: 'hr' },
    { text: 'Delete' }
  ];
  // end::snippet[]

  @internalProperty()
  private gridItems = [
    { filename: 'Annual Report.pdf', size: '23 MB' },
    { filename: 'Financials.xlsx', size: '42 MB' }
  ];

  render() {
    return html`
      <hint-badge></hint-badge>
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu .items=${this.items}>
        <vaadin-grid .items=${this.gridItems} @vaadin-contextmenu=${this.onContextMenu}>
          <vaadin-grid-column path="filename"></vaadin-grid-column>
          <vaadin-grid-column path="size"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
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
