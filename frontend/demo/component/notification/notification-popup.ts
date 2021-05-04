import 'Frontend/demo/init'; // hidden-source-line
import { render } from 'lit-html';
import { html, LitElement, customElement, css, unsafeCSS } from 'lit-element';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@vaadin/vaadin-lumo-styles/badge.js';
import '@vaadin/vaadin-lumo-styles/icons';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('notification-popup')
export class Example2 extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
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
          <iron-icon icon="lumo:bell"></iron-icon>
          <span theme="badge error primary small pill">4</span>
        </vaadin-button>
      </vaadin-context-menu>
    `;
  }

  menuRenderer = (root: HTMLElement) =>
    render(html`<div style="padding: var(--lumo-space-l);">Show notifications here</div>`, root);
  // end::snippet[]
}
