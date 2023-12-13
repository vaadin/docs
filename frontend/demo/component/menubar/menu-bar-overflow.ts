import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/menu-bar';
import '@vaadin/split-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-overflow')
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
  // end::snippet[]

  protected override render() {
    return html`
      <!-- tag::snippethtml[] -->
      <vaadin-split-layout>
        <vaadin-menu-bar .items="${this.items}"></vaadin-menu-bar>
        <div>Move the splitter to see overflow feature</div>
      </vaadin-split-layout>
      <!-- end::snippethtml[] -->
    `;
  }
}
