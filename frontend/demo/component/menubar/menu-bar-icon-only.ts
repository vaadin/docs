import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/menubarConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import '@vaadin/vaadin-icons/vaadin-icons';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-icon-only')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
  private items = [
    { component: this.createItem('eye', 'View') },
    { component: this.createItem('pencil', 'Edit') },
    {
      component: this.createItem('share', 'Share'),
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
      component: this.createItem('folder', 'Move'),
      children: [{ text: 'To folder' }, { text: 'To trash' }],
    },
    { component: this.createItem('copy', 'Duplicate') },
  ];
  // end::snippet[]

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-menu-bar theme="tertiary-inline" .items="${this.items}"></vaadin-menu-bar>
      <!-- end::snippethtml[] -->
    `;
  }

  createItem(iconName: string, ariaLabel: string) {
    const item = window.document.createElement('vaadin-context-menu-item');
    const icon = window.document.createElement('iron-icon');
    item.setAttribute('aria-label', ariaLabel);
    icon.setAttribute('icon', `vaadin:${iconName}`);
    item.appendChild(icon);
    return item;
  }
}
