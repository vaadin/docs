import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-icons/vaadin-icons';
import { applyTheme } from 'Frontend/generated/theme';

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
        margin: var(--lumo-space-s) var(--lumo-space-m);
        font-size: var(--lumo-font-size-l);
      }

      iron-icon {
        padding: 0.25rem;
        box-sizing: border-box !important;
        margin: 0 auto;
        width: var(--lumo-icon-size-m);
        height: var(--lumo-icon-size-m);
      }

      vaadin-tabs,
      vaadin-tab {
        flex: auto;
      }

      .content {
        padding: var(--lumo-space-m);
      }

      /* hidden-source-line: the bottom navbar is forced on in the example */
      vaadin-app-layout[overlay] /* hidden-source-line */ {
        --vaadin-app-layout-touch-optimized: true; /* hidden-source-line */
      } /* hidden-source-line */
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout>
        <h1 slot="navbar">MyApp</h1>
        <vaadin-tabs slot="navbar touch-optimized">
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:dashboard"></iron-icon>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:cart"></iron-icon>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:user-heart"></iron-icon>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1" target="_self">
              <iron-icon icon="vaadin:package"></iron-icon>
            </a>
          </vaadin-tab>
        </vaadin-tabs>

        <div class="content">
          <h2>Page title</h2>
          <p>Page content</p>
        </div>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
