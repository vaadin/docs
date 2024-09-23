import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/charts';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('charts-polar')
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
      <vaadin-chart polar title="Polar Chart">
        <vaadin-chart-series
          type="column"
          title="Column"
          .values="${[8, 7, 6, 5, 4, 3, 2, 1]}"
        ></vaadin-chart-series>
        <vaadin-chart-series
          type="line"
          title="Line"
          .values="${[1, 2, 3, 4, 5, 6, 7, 8]}"
        ></vaadin-chart-series>
        <vaadin-chart-series
          type="area"
          title="Area"
          .values="${[1, 8, 2, 7, 3, 6, 4, 5]}"
        ></vaadin-chart-series>
      </vaadin-chart>
      <!-- end::snippet[] -->
    `;
  }
}
