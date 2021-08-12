import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-styles')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  static get styles() {
    return css`
      vaadin-menu-bar {
        display: inline-block;
      }
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-menu-bar
        .items="${[{ text: 'Default', children: [{ text: 'Item' }] }]}"
      ></vaadin-menu-bar>
      <vaadin-menu-bar
        theme="tertiary"
        .items="${[{ text: 'Tertiary', children: [{ text: 'Item' }] }]}"
      ></vaadin-menu-bar>
      <vaadin-menu-bar
        theme="primary"
        .items="${[{ text: 'Primary', children: [{ text: 'Item' }] }]}"
      ></vaadin-menu-bar>
      <vaadin-menu-bar
        theme="small"
        .items="${[{ text: 'Small', children: [{ text: 'Item' }] }]}"
      ></vaadin-menu-bar>
      <!-- end::snippet[] -->
    `;
  }
}
