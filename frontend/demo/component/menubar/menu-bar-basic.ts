import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/flow-frontend/menubarConnector.js'; // hidden-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'Frontend/generated/theme';
import { MenuBarItem, MenuBarItemSelectedEvent } from '@vaadin/vaadin-menu-bar/vaadin-menu-bar';

@customElement('menu-bar-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private items = [
    { text: 'View' },
    { text: 'Edit' },
    {
      text: 'Share',
      children: [
        {
          text: 'On social media',
          children: [{ text: 'Facebook' }, { text: 'Twitter' }, { text: 'Instagram' }],
        },
        { text: 'By email' },
        { text: 'Get link' },
      ],
    },
    {
      text: 'Move',
      children: [{ text: 'To folder' }, { text: 'To trash' }],
    },
    { text: 'Duplicate' },
  ];

  @internalProperty()
  private selectedItem?: MenuBarItem;
  // end::snippet[]

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-menu-bar
        .items="${this.items}"
        @item-selected="${this.itemSelected}"
      ></vaadin-menu-bar>

      <div>Clicked item: ${this.selectedItem?.text}</div>
      <!-- end::snippethtml[] -->
    `;
  }

  itemSelected(e: MenuBarItemSelectedEvent) {
    this.selectedItem = e.detail.value;
  }
}
