import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/menu-bar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-dividers')
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

  protected override render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-menu-bar .items="${this.items}"></vaadin-menu-bar>
      <!-- end::snippethtml[] -->
    `;
  }
}
