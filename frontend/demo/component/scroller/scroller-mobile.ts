import 'Frontend/demo/init'; // hidden-source-line

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/vaadin-ordered-layout/vaadin-scroller';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-icon/vaadin-icon';
import '@vaadin/vaadin-icons/vaadin-iconset';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('scroller-basic')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
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
              <vaadin-icon icon="vaadin:clipboard-check" slot="prefix"></vaadin-icon>
              Audit
            </vaadin-button>
            <vaadin-button style="height: 100px;">
              <vaadin-icon icon="vaadin:book-dollar" slot="prefix"></vaadin-icon>
              Report
            </vaadin-button>
            <vaadin-button style="height: 100px;">
              <vaadin-icon icon="vaadin:line-chart" slot="prefix"></vaadin-icon>
              Dashboard
            </vaadin-button>
            <vaadin-button style="height: 100px;">
              <vaadin-icon icon="vaadin:invoice" slot="prefix"></vaadin-icon>
              Invoice
            </vaadin-button>
          </vaadin-horizontal-layout>
        </vaadin-scroller>
        <!-- end::snippet[] -->
      </section>
    `;
  }
}
