import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/menu-bar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-right-aligned')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  @state()
  private items = [
    { text: 'View' },
    { text: 'Edit' },
    {
      text: 'Share',
      children: [{ text: 'By email' }, { text: 'Get link' }],
    },
  ];

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-menu-bar theme="end-aligned" .items="${this.items}"></vaadin-menu-bar>
      <!-- end::snippet[] -->
    `;
  }
}
