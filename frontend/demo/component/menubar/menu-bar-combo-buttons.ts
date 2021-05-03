import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/menubarConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, internalProperty } from 'lit-element';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import '@vaadin/vaadin-icons/vaadin-icons';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-combo-buttons')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @internalProperty()
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
    const icon = window.document.createElement('iron-icon');
    item.setAttribute('aria-label', 'Other save options');
    icon.setAttribute('icon', `vaadin:chevron-down`);
    item.appendChild(icon);
    return item;
  }
}
