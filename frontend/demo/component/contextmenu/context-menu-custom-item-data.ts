import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/context-menu';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { ContextMenuItem, ContextMenuItemSelectedEvent } from '@vaadin/context-menu';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('context-menu-custom-item-data')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: Array<ContextMenuItem<{ value: string }>> = [
    {
      text: 'Copy as plain text',
      value:
        'Context Menu\n\nContext Menu is a component that you can attach to any component to display a context menu.',
    },
    {
      text: 'Copy as HTML',
      value:
        '<h1>Context Menu</h1><p>Context Menu is a component that you can attach to any component to display a context menu.</p>',
    },
    {
      text: 'Copy as Markdown',
      value:
        '# Context Menu\n\nContext Menu is a component that you can attach to any component to display a context menu.',
    },
  ];

  protected override render() {
    return html`
      <vaadin-context-menu .items="${this.items}" @item-selected="${this.itemSelected}">
        <h1>Context Menu</h1>
        <p>
          Context Menu is a component that you can attach to any component to display a context
          menu.
        </p>
      </vaadin-context-menu>
    `;
  }

  itemSelected(e: ContextMenuItemSelectedEvent<ContextMenuItem<{ value?: string }>>) {
    const value = e.detail.value.value;
    if (value) {
      navigator.clipboard.writeText(value);
    }
  }

  // end::snippet[]
}
