import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/horizontal-layout';
import '@vaadin/menu-bar';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('menu-bar-styles')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
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
      </vaadin-horizontal-layout>
    `;
  }
}
