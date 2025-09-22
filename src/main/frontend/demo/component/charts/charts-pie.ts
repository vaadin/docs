import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/charts';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('charts-pie')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  protected override render() {
    return html`
      <!-- tag::snippet[] -->
      <vaadin-chart type="pie" title="Pie Chart" tooltip>
        <vaadin-chart-series
          title="Brands"
          .values="${[
            { name: 'Chrome', y: 38 },
            { name: 'Firefox', y: 24 },
            { name: 'Edge', y: 15, sliced: true, selected: true },
            { name: 'Internet Explorer', y: 8 },
          ]}"
        ></vaadin-chart-series>
      </vaadin-chart>
      <!-- end::snippet[] -->
    `;
  }
}
