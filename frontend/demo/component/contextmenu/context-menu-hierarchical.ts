import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import type { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';
import { applyTheme } from 'Frontend/generated/theme';

interface FileItem {
  name: string;
  size: string;
}

@customElement('context-menu-hierarchical')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items = [
    { text: 'Preview' },
    { text: 'Edit' },
    { component: 'hr' },
    {
      text: 'Export',
      children: [
        { text: 'Portable Document Format (.pdf)' },
        { text: 'Rich Text Format (.rtf)' },
        { text: 'Plain text (.txt)' },
      ],
    },
    { text: 'Share', children: [{ text: 'Copy link' }, { text: 'Email' }] },
    { component: 'hr' },
    { text: 'Delete' },
  ];
  // end::snippet[]

  @state()
  private gridItems: FileItem[] = [
    { name: 'Annual Report.docx', size: '24 MB' },
    { name: 'Financials.xlsx', size: '42 MB' },
  ];

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu .items=${this.items}>
        <vaadin-grid
          all-rows-visible
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
    const target = e.currentTarget as GridElement;
    if ((target.getEventContext(e) as GridEventContext<FileItem>).section !== 'body') {
      e.stopPropagation();
    }
  }
}
