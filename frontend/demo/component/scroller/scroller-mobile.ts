import 'Frontend/demo/init'; // hidden-source-line

import { html, css, LitElement, customElement } from 'lit-element';
import '@vaadin/vaadin-ordered-layout/vaadin-scroller';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icons/vaadin-icons';
import '@vaadin/vaadin-lumo-styles/icons';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('scroller-basic')
export class Example extends LitElement {
  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  static get styles() {
    return css`
      section {
        border: 1px solid var(--lumo-contrast-20pct);
        max-width: 100%;
        width: 360px;
      }

      section h2 {
        margin-left: var(--lumo-space-m);
        margin-right: var(--lumo-space-m);
      }
    `;
  }

  render() {
    return html`
      <section id="container">
        <h2>Create new...</h2>

        <!-- tag::snippet[] -->
        <vaadin-scroller scroll-direction="horizontal">
          <vaadin-horizontal-layout style="display: inline-flex;" theme="padding spacing">
            <vaadin-button style="height: 100px;">
              <iron-icon icon="vaadin:clipboard-check" slot="prefix"></iron-icon>
              Audit
            </vaadin-button>
            <vaadin-button style="height: 100px;">
              <iron-icon icon="vaadin:book-dollar" slot="prefix"></iron-icon>
              Report
            </vaadin-button>
            <vaadin-button style="height: 100px;">
              <iron-icon icon="vaadin:line-chart" slot="prefix"></iron-icon>
              Dashboard
            </vaadin-button>
            <vaadin-button style="height: 100px;">
              <iron-icon icon="vaadin:invoice" slot="prefix"></iron-icon>
              Invoice
            </vaadin-button>
          </vaadin-horizontal-layout>
        </vaadin-scroller>
        <!-- end::snippet[] -->
      </section>
    `;
  }
}
