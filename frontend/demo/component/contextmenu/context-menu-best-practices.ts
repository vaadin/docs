import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-source-line
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-grid/vaadin-grid';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-best-practices')
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
  private gridItems = [
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
          height-by-rows
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
    if (
      ((e.currentTarget as GridElement).getEventContext(e) as GridEventContext).section !== 'body'
    ) {
      e.stopPropagation();
    }
  }
}
