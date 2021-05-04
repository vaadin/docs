import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-disabled')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private items = [
    { text: 'Preview' },
    { text: 'Edit' },
    { component: 'hr' },
    {
      text: 'Export',
      children: [
        { text: 'Portable Document Format (.pdf)', disabled: true },
        { text: 'Rich Text Format (.rtf)' },
        { text: 'Plain text (.txt)' },
      ],
    },
    { text: 'Share', children: [{ text: 'Copy link' }, { text: 'Email' }] },
    { component: 'hr' },
    { text: 'Delete', disabled: true },
  ];
  // end::snippet[]

  @internalProperty()
  private gridItems = [
    { name: 'Annual Report.pdf', size: '24 MB' },
    { name: 'Financials.pdf', size: '42 MB' },
  ];

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu .items=${this.items}>
        <vaadin-grid
          height-by-rows
          .items=${this.gridItems}
          @vaadin-contextmenu=${this.onContextMenu}
        >
          <vaadin-grid-column path="name"></vaadin-grid-column>
          <vaadin-grid-column path="size"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  onContextMenu(e: MouseEvent) {
    // Prevent opening context menu on header row.
    if (
      ((e.currentTarget as GridElement).getEventContext(e) as GridEventContext).section !== 'body'
    ) {
      e.stopPropagation();
    }
  }
}
