import 'Frontend/demo/init'; // hidden-source-line
import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';
import '@vaadin/charts';
import type { Options, PointOptionsObject } from 'highcharts';

@customElement('charts-overview')
export class Example extends LitElement {
  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  static override styles = css`
    :host {
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      background-color: var(--docs-surface-color-2);
      padding: 0.5rem;
      padding-top: 1.5rem;
      position: relative;
    }

    vaadin-chart {
      padding: 0.5rem;
      box-sizing: border-box;
    }

    label {
      position: absolute;
      z-index: 1;
      top: 0.5rem;
      left: 1rem;
      font-size: var(--docs-font-size-2xs);
      font-weight: var(--docs-font-weight-emphasis);
    }

    select {
      font: inherit;
    }
  `;

  @state()
  private areaOptions: Options = {
    yAxis: { title: { text: '' } },
    xAxis: { visible: false },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
  };

  @state()
  private columnOptions: Options = { yAxis: { title: { text: '' } } };

  @state()
  private months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  @state()
  private pieOptions: Options = {
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        innerSize: '60%',
      },
    },
  };

  @state()
  private pieValues: PointOptionsObject[] = [
    { name: 'Chrome', y: 38 },
    { name: 'Firefox', y: 24 },
    { name: 'Edge', y: 15, sliced: true, selected: true },
    { name: 'Internet Explorer', y: 8 },
  ];

  @state()
  private polarOptions: Options = {
    xAxis: {
      tickInterval: 45,
      min: 0,
      max: 360,
      labels: {},
      visible: false,
    },
    yAxis: { min: 0 },
    plotOptions: {
      series: {
        pointStart: 0,
        pointInterval: 45,
      },
      column: {
        pointPadding: 0,
        groupPadding: 0,
      },
    },
  };

  changeTheme(e: InputEvent) {
    [...this.renderRoot.querySelectorAll('vaadin-chart')].forEach((chart) => {
      chart.setAttribute('theme', (e.target as HTMLSelectElement).value);
    });
  }

  // tag::snippet[]
  protected override render() {
    return html`
      <vaadin-chart
        type="column"
        .categories="${['Jan', 'Feb', 'Mar']}"
        .additionalOptions="${this.columnOptions}"
      >
        <vaadin-chart-series title="Tokyo" .values="${[49.9, 71.5, 106.4]}"></vaadin-chart-series>
        <vaadin-chart-series title="New York" .values="${[83.6, 78.8, 98.5]}"></vaadin-chart-series>
        <vaadin-chart-series title="London" .values="${[48.9, 38.8, 39.3]}"></vaadin-chart-series>
      </vaadin-chart>

      <vaadin-chart
        type="area"
        stacking="normal"
        .categories="${this.months}"
        .additionalOptions="${this.areaOptions}"
        tooltip
        no-legend
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
          title="Poud sterling"
          .values="${[32, 21, 8, 12, 32, 21, 12, 30, 25, 19, 26, 15]}"
        ></vaadin-chart-series>
      </vaadin-chart>

      <vaadin-chart type="pie" tooltip .additionalOptions="${this.pieOptions}">
        <vaadin-chart-series title="Brands" .values="${this.pieValues}"></vaadin-chart-series>
      </vaadin-chart>

      <vaadin-chart polar .additionalOptions="${this.polarOptions}">
        <vaadin-chart-series
          type="column"
          title="Column"
          .values="${[8, 7, 6, 5, 4, 3, 2, 1]}"
          additional-options='{ "pointPlacement": "between" }'
        ></vaadin-chart-series>
        <vaadin-chart-series type="line" title="Line" .values="${[1, 2, 3, 4, 5, 6, 7, 8]}">
        </vaadin-chart-series>
        <vaadin-chart-series type="area" title="Area" .values="${[1, 8, 2, 7, 3, 6, 4, 5]}">
        </vaadin-chart-series>
      </vaadin-chart>

      <label>
        Theme:
        <select @change="${this.changeTheme}">
          <option value="">Default</option>
          <option value="gradient">Gradient</option>
          <option value="monotone">Monotone</option>
          <option value="classic">Classic</option>
        </select>
      </label>
    `;
    // end::snippet[]
  }
}
