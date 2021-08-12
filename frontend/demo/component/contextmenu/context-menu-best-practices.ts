import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import type { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'Frontend/generated/theme';

interface FileItem {
  name: string;
  size: string;
}

@customElement('context-menu-best-practices')
export class Example extends LitElement {
  protected createRenderRoot() {
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

  private menuBarRenderer = (root: HTMLElement) => {
    if (root.firstElementChild) {
      return;
    }

    const menuBar = document.createElement('vaadin-menu-bar');
    menuBar.items = [{ component: this.makeIcon(), children: this.items }];
    menuBar.setAttribute('theme', 'tertiary');
    root.appendChild(menuBar);
  };

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
          <vaadin-grid-column
            auto-width
            flex-grow="0"
            .renderer="${this.menuBarRenderer}"
          ></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  makeIcon() {
    const item = window.document.createElement('vaadin-context-menu-item');
    item.textContent = '•••';
    item.setAttribute('aria-label', 'More options');
    return item;
  }

  onContextMenu(e: MouseEvent) {
    // Prevent opening context menu on header row.
    const target = e.currentTarget as GridElement;
    if ((target.getEventContext(e) as GridEventContext<FileItem>).section !== 'body') {
      e.stopPropagation();
    }
  }
}
