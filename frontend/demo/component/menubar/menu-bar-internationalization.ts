import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/menu-bar';
import type { MenuBarI18n } from '@vaadin/menu-bar';
import '@vaadin/split-layout';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-internationalization')
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

  protected override render() {
    // tag::snippet[]
    const customI18n: MenuBarI18n = {
      // Provide accessible label for the overflow menu button
      // to screen readers
      moreOptions: 'More actions',
    };

    return html`<vaadin-menu-bar .i18n="${customI18n}" .items="${this.items}"></vaadin-menu-bar>`;
    // end::snippet[]
  }
}
