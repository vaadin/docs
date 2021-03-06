import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import { applyTheme } from 'generated/theme';
import {
  ContextMenuItem,
  ContextMenuItemSelected
} from '@vaadin/vaadin-context-menu/vaadin-context-menu';

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
    { text: 'Abigail Lewis' },
    { text: 'Allison Torres', checked: true },
    { text: 'Anna Myers' },
    { text: 'Lauren Wright' },
    { text: 'Tamaki Ryushi' }
  ];

  @internalProperty()
  private selectedItem?: ContextMenuItem = this.items[1];
  // end::snippet[]

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu .items=${this.items} @item-selected=${this.itemSelected}>
        <div>Assignee: <b>${this.selectedItem?.text}</b></div>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  itemSelected(e: ContextMenuItemSelected) {
    this.selectedItem = e.detail.value;
    this.items.forEach(item => (item.checked = item === this.selectedItem));
  }
}
