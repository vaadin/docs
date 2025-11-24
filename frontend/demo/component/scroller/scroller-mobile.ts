import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/button';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/icons';
import '@vaadin/scroller';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('scroller-mobile')
export class Example extends LitElement {
  static override styles = css`
    section {
      border: solid 1px var(--vaadin-border-color);
      max-width: 100%
      width: 360px;
    }
  `;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <section id="container">
        <h2 style="padding: 1rem 1rem 0; font-size: 1.375rem">Create new...</h2>

        <!-- tag::snippet[] -->
        <vaadin-scroller scroll-direction="horizontal">
          <vaadin-horizontal-layout style="display: inline-flex" theme="padding spacing">
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
