import 'Frontend/demo/init'; // hidden-source-line
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/charts';

@customElement('charts-column')
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
      <vaadin-chart title="Column Chart" type="column" .categories="${['Jan', 'Feb', 'Mar']}">
        <vaadin-chart-series title="Tokyo" .values="${[49.9, 71.5, 106.4]}"></vaadin-chart-series>
        <vaadin-chart-series title="New York" .values="${[83.6, 78.8, 98.5]}"></vaadin-chart-series>
        <vaadin-chart-series title="London" .values="${[48.9, 38.8, 39.3]}"></vaadin-chart-series>
      </vaadin-chart>
      <!-- end::snippet[] -->
    `;
  }
}
