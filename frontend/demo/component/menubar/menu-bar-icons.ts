import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-icons')
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
      component: this.createItem('share', 'Share'),
      children: [
        { component: this.createItem('share', 'By email', true) },
        { component: this.createItem('link', 'Get link', true) },
      ],
    },
    {
      component: this.createItem('copy', ''),
    },
  ];
  // end::snippet[]

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-menu-bar theme="icon" .items="${this.items}"></vaadin-menu-bar>
      <!-- end::snippethtml[] -->
    `;
  }

  createItem(iconName: string, text: string, isChild = false) {
    const item = window.document.createElement('vaadin-context-menu-item');
    const icon = window.document.createElement('vaadin-icon');

    if (isChild) {
      icon.style.width = 'var(--lumo-icon-size-s)';
      icon.style.height = 'var(--lumo-icon-size-s)';
      icon.style.marginRight = 'var(--lumo-space-s)';
    }

    if (iconName == 'copy') {
      item.setAttribute('aria-label', 'duplicate');
    }

    icon.setAttribute('icon', `vaadin:${iconName}`);
    item.appendChild(icon);
    text && item.appendChild(window.document.createTextNode(text));
    return item;
  }
}
