import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-source-line
import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import {
  ContextMenuItem,
  ContextMenuItemSelected,
} from '@vaadin/vaadin-context-menu/vaadin-context-menu';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-checkable')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private items: ContextMenuItem[] = [
    { text: 'Abigail Lewis' },
    { text: 'Allison Torres' },
    { text: 'Anna Myers' },
    { text: 'Lauren Wright' },
    { text: 'Tamaki Ryushi' },
  ];

  @internalProperty()
  private selectedItem = this.items[1];
  // end::snippet[]

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-context-menu
        .items="${this.items.map((item) => {
          return { ...item, checked: item === this.selectedItem };
        })}"
        @item-selected="${this.itemSelected}"
      >
        <span>Assignee: <b>${this.selectedItem?.text}</b></span>
      </vaadin-context-menu>
      <!-- end::snippethtml[] -->
    `;
  }

  // tag::snippetselected[]
  itemSelected(e: ContextMenuItemSelected) {
    this.selectedItem = this.items.find(
      (item) => item.text === e.detail.value.text
    ) as ContextMenuItem;
  }
  // end::snippetselected[]
}
