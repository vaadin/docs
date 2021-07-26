import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement, render, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-lumo-styles/badge';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-popup')
export class Example2 extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  static get styles() {
    return [
      // Workaround for applying `lumo-badge` styles,
      // which is a legacy Polymer style module
      unsafeCSS(
        document.head.querySelector('dom-module#lumo-badge')?.querySelector('template')?.content
          .firstElementChild?.textContent
      ),
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
  }

  // tag::snippet[]
  render() {
    return html`
      <vaadin-context-menu open-on="click" .renderer="${this.menuRenderer}">
        <vaadin-button aria-label="notifications" theme="tertiary">
          <vaadin-icon icon="vaadin:bell-o"></vaadin-icon>
          <span theme="badge error primary small pill">4</span>
        </vaadin-button>
      </vaadin-context-menu>
    `;
  }

  menuRenderer = (root: HTMLElement) =>
    render(html`<div style="padding: var(--lumo-space-l);">Show notifications here</div>`, root);
  // end::snippet[]
}
