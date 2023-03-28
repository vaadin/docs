import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/context-menu';
import '@vaadin/grid';
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { Grid } from '@vaadin/grid';
import '@vaadin/menu-bar';
import { applyTheme } from 'Frontend/generated/theme';

interface FileItem {
  name: string;
  size: string;
}

@customElement('context-menu-best-practices')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items = [{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }];
  // end::snippet[]

  @state()
  private gridItems: FileItem[] = [
    { name: 'Annual Report.docx', size: '24 MB' },
    { name: 'Financials.xlsx', size: '42 MB' },
  ];

  protected override render() {
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
          <vaadin-grid-column
            width="70px"
            flex-grow="0"
            ${columnBodyRenderer(
              () => html`
                <vaadin-menu-bar .items=${this.items} theme="tertiary"></vaadin-menu-bar>
              `,
              []
            )}
          ></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  onContextMenu(e: MouseEvent) {
    // Prevent opening context menu on header row.
    const target = e.currentTarget as Grid<FileItem>;
    if (target.getEventContext(e).section !== 'body') {
      e.stopPropagation();
    }
  }
}
