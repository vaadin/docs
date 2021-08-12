import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import type {
  ContextMenuItem,
  ContextMenuItemSelectedEvent,
} from '@vaadin/vaadin-context-menu/vaadin-context-menu';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-checkable')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: ContextMenuItem[] = [
    { text: 'Abigail Lewis', checked: true },
    { text: 'Allison Torres' },
    { text: 'Anna Myers' },
    { text: 'Lauren Wright' },
    { text: 'Tamaki Ryushi' },
  ];

  render() {
    const selectedItem = this.items.find((item) => item.checked);

    return html`
      <vaadin-context-menu .items="${this.items}" @item-selected="${this.itemSelected}">
        <span>Assignee: <b>${selectedItem?.text}</b></span>
      </vaadin-context-menu>
    `;
  }

  itemSelected(e: ContextMenuItemSelectedEvent) {
    this.items.forEach((item) => {
      item.checked = item === e.detail.value;
    });
    this.items = [...this.items];
  }
  // end::snippet[]
}
