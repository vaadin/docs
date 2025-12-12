import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/menu-bar';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { MenuBarItem, MenuBarItemSelectedEvent } from '@vaadin/menu-bar';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('menu-bar-custom-item-data')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items: Array<MenuBarItem<{ value?: string }>> = [
    {
      text: 'Copy',
      children: [
        {
          text: 'Copy as plain text',
          value:
            'Menu Bar\n\nMenu Bar is a horizontal button bar with hierarchical drop-down menus.',
        },
        {
          text: 'Copy as HTML',
          value:
            '<h1>Menu Bar</h1><p>Menu Bar is a horizontal button bar with hierarchical drop-down menus.</p>',
        },
        {
          text: 'Copy as Markdown',
          value:
            '# Menu Bar\n\nMenu Bar is a horizontal button bar with hierarchical drop-down menus.',
        },
      ],
    },
  ];

  protected override render() {
    return html`
      <vaadin-menu-bar
        .items="${this.items}"
        @item-selected="${this.itemSelected}"
      ></vaadin-menu-bar>
    `;
  }

  itemSelected(e: MenuBarItemSelectedEvent<MenuBarItem<{ value?: string }>>) {
    const { value } = e.detail.value;
    if (value) {
      navigator.clipboard.writeText(value);
    }
  }
  // end::snippet[]
}
