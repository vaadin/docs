import 'Frontend/demo/init'; // hidden-full-source-line
import { html, LitElement, customElement, css } from 'lit-element';
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-tabs/vaadin-tabs';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('app-layout-navbar')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      h1 {
        font-size: var(--lumo-font-size-l);
        left: var(--lumo-space-l);
        margin: 0;
        position: absolute;
      }
      
      vaadin-tabs {
        margin: auto;
      )
    `;
  }

  render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-app-layout>
        <h1 slot="navbar">MyApp</h1>
        <vaadin-tabs slot="navbar">
          <vaadin-tab>
            <a tabindex="-1">Dashboard</a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">Orders</a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">Customers</a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">Products</a>
          </vaadin-tab>
        </vaadin-tabs>
      </vaadin-app-layout>
      <!-- end::snippet[] -->
    `;
  }
}
