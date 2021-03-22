import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-grid/vaadin-grid';
import { applyTheme } from 'Frontend/generated/theme';
import { GridElement, GridEventContext } from '@vaadin/vaadin-grid/vaadin-grid';

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
    { filename: 'Annual Report.pdf', size: '23 MB' },
    { filename: 'Financials.xlsx', size: '42 MB' },
  ];

  private menuBarRenderer = (root: HTMLElement) => {
    if (root.firstElementChild) {
      return;
    }

    const menuBar = document.createElement('vaadin-menu-bar');
    menuBar.items = [{ component: this.makeIcon('vaadin:ellipsis-dots-v'), children: this.items }];
    menuBar.setAttribute('theme', 'icon tertiary');
    root.appendChild(menuBar);
  };

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu .items=${this.items}>
        <vaadin-grid .items=${this.gridItems} @vaadin-contextmenu=${this.onContextMenu}>
          <vaadin-grid-column label="Filename" path="filename"></vaadin-grid-column>
          <vaadin-grid-column label="Size" path="size"></vaadin-grid-column>
          <vaadin-grid-column
            width="80px"
            flex-grow="0"
            .renderer="${this.menuBarRenderer}"
          ></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  makeIcon(iconName: string) {
    const item = window.document.createElement('vaadin-context-menu-item');
    const icon = window.document.createElement('iron-icon');
    icon.setAttribute('icon', iconName);
    item.appendChild(icon);
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
