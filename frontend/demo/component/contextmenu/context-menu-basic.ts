import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';

// tag::snippet[]
@customElement('context-menu-basic')
export class Example extends LitElement {
  @internalProperty()
  private items = [{ text: 'Menu Item 1' }, { text: 'Menu Item 2' }];

  @internalProperty()
  private selectedItem?: { text: string };

  render() {
    return html`
      <vaadin-context-menu .items=${this.items} @item-selected=${this.itemSelected}>
        <p>Right click (or long touch on mobile) this text to open the context menu.</p>
      </vaadin-context-menu>

      <div>Selected: ${this.selectedItem?.text}</div>
    `;
  }

  itemSelected(e: CustomEvent) {
    this.selectedItem = e.detail.value;
  }
}
// end::snippet[]
