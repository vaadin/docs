import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/context-menu';
import type { ContextMenuItem, ContextMenuItemSelectedEvent } from '@vaadin/context-menu';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('context-menu-classname')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private accessor items: ContextMenuItem[] = [
    { text: 'Success', className: 'text-success' },
    { text: 'Warning', className: 'text-warning' },
    { text: 'Error', className: 'text-error' },
  ];
  // end::snippet[]

  protected override render() {
    const selectedItem = this.items.find((item) => item.checked);

    return html`
      <vaadin-context-menu .items="${this.items}" @item-selected="${this.itemSelected}">
        <span>Status: <b class="${selectedItem?.className || ''}">${selectedItem?.text}</b></span>
      </vaadin-context-menu>
    `;
  }

  itemSelected(e: ContextMenuItemSelectedEvent) {
    this.items.forEach((item) => {
      item.checked = item === e.detail.value;
    });
    this.items = [...this.items];
  }
}
