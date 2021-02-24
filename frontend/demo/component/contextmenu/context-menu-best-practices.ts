import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/gridConnector.js'; // hidden-full-source-line
import './hint-badge'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-grid/vaadin-grid';
import { applyTheme } from 'generated/theme';

@customElement('context-menu-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private items = [{ text: 'View' }, { text: 'Edit' }, { text: 'Delete' }];
  // end:snippet[]

  @internalProperty()
  private gridItems = [
    { filename: 'Annual Report.pdf', size: '23 MB' },
    { filename: 'Financials.xlsx', size: '42 MB' }
  ];

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <hint-badge
        message="Open the Context Menu by right-clicking (desktop) or long-pressing (mobile) a Grid row. Alternatively, use the Menu Bar in the last column."
      ></hint-badge>
      <!-- hidden-full-source-line -->
      <vaadin-context-menu .items=${this.items}>
        <vaadin-grid .items=${this.gridItems}>
          <vaadin-grid-column label="Filename" path="filename"></vaadin-grid-column>
          <vaadin-grid-column label="Size" path="size"></vaadin-grid-column>
          <vaadin-grid-column
            width="120px"
            flex-grow="0"
            .renderer="${this.menuBarRenderer.bind(this)}"
          ></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  menuBarRenderer(root: HTMLElement) {
    if (root.firstElementChild) {
      return;
    }

    const menuBar = document.createElement('vaadin-menu-bar');
    menuBar &&
      (menuBar.items = [
        { component: this.makeIcon('vaadin:ellipsis-dots-v'), children: this.items }
      ]);
    root.appendChild(menuBar);
  }

  makeIcon(iconName: string) {
    const item = window.document.createElement('vaadin-context-menu-item');
    const icon = window.document.createElement('iron-icon');
    icon.setAttribute('icon', iconName);
    item.appendChild(icon);
    return item;
  }
}
