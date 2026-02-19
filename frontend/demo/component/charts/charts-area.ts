import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/charts';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/demo/theme';

@customElement('charts-area')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-chart
        type="area"
        title="Area Chart"
        stacking="normal"
        .categories="${'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')}"
      >
        <vaadin-chart-series
          title="United States dollar"
          .values="${[135, 125, 89, 124, 105, 81, 111, 94, 95, 129, 98, 84]}"
        ></vaadin-chart-series>
        <vaadin-chart-series
          title="Euro"
          .values="${[62, 72, 89, 68, 94, 92, 110, 100, 109, 89, 86, 105]}"
        ></vaadin-chart-series>
        <vaadin-chart-series
          title="Japanese yen"
          .values="${[30, 25, 32, 26, 15, 31, 24, 32, 21, 8, 12, 32]}"
        ></vaadin-chart-series>
        <vaadin-chart-series
          title="Pound sterling"
          .values="${[32, 21, 8, 12, 32, 21, 12, 30, 25, 19, 26, 15]}"
        ></vaadin-chart-series>
      </vaadin-chart>
      <!-- end::snippet[] -->
    `;
  }
}
