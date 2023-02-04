import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/context-menu';
import { contextMenuRenderer } from '@vaadin/context-menu/lit.js';
import '@vaadin/icon';
import { badge } from '@vaadin/vaadin-lumo-styles/badge.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-popup')
export class Example2 extends LitElement {
  static styles = [
    badge,
    css`
      vaadin-context-menu {
        /* Wrap the click target around the button */
        display: inline-block;
      }

      span[theme~='badge'] {
        position: absolute;
        transform: translate(-40%, -30%);
      }
    `,
  ];

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  // tag::snippet[]
  protected override render() {
    return html`
      <vaadin-context-menu
        open-on="click"
        ${contextMenuRenderer(
          () => html`<div style="padding: var(--lumo-space-l);">Show notifications here</div>`,
          []
        )}
      >
        <vaadin-button aria-label="notifications" theme="tertiary">
          <vaadin-icon icon="vaadin:bell-o"></vaadin-icon>
          <span theme="badge error primary small pill">4</span>
        </vaadin-button>
      </vaadin-context-menu>
    `;
  }
  // end::snippet[]
}
