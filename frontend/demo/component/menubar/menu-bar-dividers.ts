import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/menubarConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-dividers')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  // tag::snippet[]
  @state()
  private items = [
    {
      text: 'Share',
      children: [
        { text: 'Facebook' },
        { text: 'Twitter' },
        { text: 'Instagram' },
        { component: 'hr' },
        { text: 'By email' },
        { text: 'Get link' },
        { component: 'hr' },
        { text: 'Set permissions' },
      ],
    },
  ];
  // end::snippet[]

  render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-menu-bar .items="${this.items}"></vaadin-menu-bar>
      <!-- end::snippethtml[] -->
    `;
  }
}
