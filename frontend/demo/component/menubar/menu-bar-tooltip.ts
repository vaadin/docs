import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/menu-bar';
import '@vaadin/tooltip';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-tooltip')
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
    {
      component: this.createItem('eye'),
      tooltip: 'View',
    },
    {
      component: this.createItem('pencil'),
      tooltip: 'Edit',
    },
    {
      component: this.createItem('folder'),
      tooltip: 'Move',
    },
    {
      component: this.createItem('copy'),
      tooltip: 'Duplicate',
    },
    {
      component: this.createItem('archive'),
      tooltip: 'Archive',
      disabled: true,
    },
  ];
  // end::snippet[]

  protected override render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-menu-bar .items="${this.items}" theme="icon">
        <vaadin-tooltip slot="tooltip"></vaadin-tooltip>
      </vaadin-menu-bar>
      <!-- end::snippethtml[] -->
    `;
  }

  createItem(iconName: string) {
    const item = document.createElement('vaadin-menu-bar-item');
    const icon = document.createElement('vaadin-icon');
    icon.setAttribute('icon', `vaadin:${iconName}`);
    item.appendChild(icon);
    return item;
  }
}
