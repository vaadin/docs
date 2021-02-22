import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
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
  private items = [
    { text: 'Abigail Lewis', checkable: true },
    { text: 'Allison Torres', checkable: true, checked: true },
    { text: 'Anna Myers', checkable: true },
    { text: 'Lauren Wright', checkable: true },
    { text: 'Tamaki Ryushi', checkable: true }
  ];

  @internalProperty()
  private selectedItem?: { text: string } = this.items[1];
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

  itemSelected(e: CustomEvent) {
    this.selectedItem = e.detail.value;
  }
}
