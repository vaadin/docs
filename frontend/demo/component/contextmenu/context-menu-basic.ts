import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, property } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';

// tag::snippet[]
@customElement('context-menu-basic')
export class Example extends LitElement {
  @property() contextMenuitems = [
    { text: 'Menu Item 1' },
    { text: 'Menu Item 2' },
  ];

  @property() status = '';

  render() {
    return html`
      <vaadin-context-menu
        .items=${this.contextMenuitems}
        @item-selected=${this.itemSelected}
      >
        <p>
          Right click (or long touch on mobile) this text to open the context
          menu.
        </p>
      </vaadin-context-menu>

      <div>${this.status}</div>
    `;
  }

  itemSelected(e: CustomEvent) {
    const item = e.detail.value;
    this.status = `Selected: ${item.text}`;
  }
}
// end::snippet[]
