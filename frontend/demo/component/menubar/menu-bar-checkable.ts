import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'Frontend/generated/theme';
import { MenuBarItemSelectedEvent, SubMenuItem } from '@vaadin/vaadin-menu-bar/vaadin-menu-bar';

@customElement('menu-bar-checkable')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
  private items = [
    {
      text: 'Options',
      children: [{ text: 'Save automatically', checked: true }, { text: 'Notify watchers' }],
    },
  ];
  // end::snippet[]

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-menu-bar
        .items="${this.items}"
        @item-selected="${this.itemSelected}"
      ></vaadin-menu-bar>
      <!-- end::snippethtml[] -->
    `;
  }

  // tag::snippetselected[]
  itemSelected(e: MenuBarItemSelectedEvent) {
    const item = e.detail.value;
    (item as SubMenuItem).checked = !(item as SubMenuItem).checked;
  }
  // end::snippetselected[]
}
