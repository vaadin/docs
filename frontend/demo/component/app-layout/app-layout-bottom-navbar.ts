import '../../init'; // hidden-full-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-icons/vaadin-icons';
import { applyTheme } from 'themes/theme-generated.js';

@customElement('app-layout-bottom-navbar')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      h1 {
        margin: 0 var(--lumo-space-s);
        font-size: var(--lumo-font-size-l);
      }

      vaadin-tabs,
      vaadin-tab {
        flex: 1;
      }
      /* hidden-full-source-line: the bottom navbar is forced on in the example */
      vaadin-app-layout[overlay] /* hidden-full-source-line */ {
        --vaadin-app-layout-touch-optimized: true; /* hidden-full-source-line */
      } /* hidden-full-source-line */
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout>
        <h1 slot="navbar">MyApp</h1>
        <vaadin-tabs slot="navbar touch-optimized">
          <vaadin-tab>
            <iron-icon icon="vaadin:dashboard"></iron-icon>
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:cart"></iron-icon>
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:user-heart"></iron-icon>
          </vaadin-tab>
          <vaadin-tab>
            <iron-icon icon="vaadin:package"></iron-icon>
          </vaadin-tab>
        </vaadin-tabs>

        <div class="content">
          <h3>Page title</h3>
          <p>Page content</p>
        </div>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
