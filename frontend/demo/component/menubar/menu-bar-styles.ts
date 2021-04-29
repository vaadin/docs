import 'Frontend/demo/init'; // hidden-full-source-line
import '@vaadin/flow-frontend/menubarConnector.js'; // hidden-full-source-line
import '@vaadin/flow-frontend/contextMenuConnector.js'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-menu-bar/vaadin-menu-bar';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('menu-bar-styles')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
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
