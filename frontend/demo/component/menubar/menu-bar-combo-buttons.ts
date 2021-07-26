import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-combo-buttons')
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
    { text: 'Save' },
    {
      component: this.createItem(),
      children: [{ text: 'Save as draft' }, { text: 'Save as copy' }, { text: 'Save and publish' }],
    },
  ];
  // end::snippet[]

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-menu-bar theme="icon primary" .items="${this.items}"></vaadin-menu-bar>
      <!-- end::snippethtml[] -->
    `;
  }

  private createItem() {
    const item = window.document.createElement('vaadin-context-menu-item');
    const icon = window.document.createElement('vaadin-icon');
    item.setAttribute('aria-label', 'Other save options');
    icon.setAttribute('icon', `vaadin:chevron-down`);
    item.appendChild(icon);
    return item;
  }
}
