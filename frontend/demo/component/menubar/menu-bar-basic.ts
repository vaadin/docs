import '../../init'; // hidden-full-source-line
import '@vaadin/flow-frontend/menubarConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';

// tag::snippet[]
@customElement('menu-bar-basic')
export class Example extends LitElement {
  @internalProperty()
  private items = [
    {
      text: 'Project',
      children: [
        { text: 'Users', children: [{ text: 'List' }, { text: 'Add' }] },
        {
          text: 'Billing',
          children: [{ text: 'Invoices' }, { text: 'Balance Events' }]
        }
      ]
    },
    {
      text: 'Account',
      children: [{ text: 'Edit Profile' }, { text: 'Privacy Settings' }]
    },
    { text: 'Sign Out' }
  ];

  @internalProperty()
  private selectedItem?: { text: string };

  render() {
    return html`
      <vaadin-menu-bar .items=${this.items} @item-selected=${this.itemSelected}> </vaadin-menu-bar>

      <div>Selected: ${this.selectedItem?.text}</div>
    `;
  }

  itemSelected(e: CustomEvent) {
    this.selectedItem = e.detail.value;
  }
}
// end::snippet[]
