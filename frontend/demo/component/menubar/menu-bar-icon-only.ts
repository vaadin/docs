import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/menu-bar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-icon-only')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  @state()
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

  protected override render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-menu-bar theme="tertiary-inline" .items="${this.items}"></vaadin-menu-bar>
      <!-- end::snippethtml[] -->
    `;
  }

  createItem(iconName: string, ariaLabel: string) {
    const item = document.createElement('vaadin-menu-bar-item');
    const icon = document.createElement('vaadin-icon');
    item.setAttribute('aria-label', ariaLabel);
    icon.setAttribute('icon', `vaadin:${iconName}`);
    item.appendChild(icon);
    return item;
  }
}
