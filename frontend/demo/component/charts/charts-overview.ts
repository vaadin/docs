import 'Frontend/demo/init'; // hidden-source-line

import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/charts';
import './ThemeSwitcher';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('charts-overview')
export class Example extends LitElement {
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(root);
    return root;
  }

  render() {
    return html`
      <style>
        .wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px , 1fr));
        }
        
        .panel {
          padding: 1rem;
        }
        
        .panel.dark {
          background: var(--docs-surface-color-2);
        }
        .panel.dark vaadin-chart {
          --vaadin-charts-background: transparent;
        }
        theme-switcher {
          display: block;
          padding-bottom: 1rem;
        }
      </style>
      <theme-switcher></theme-switcher>
      
      <div class="wrapper">
        <div class="panel">
            <vaadin-chart
              style="height: 300px;"
              id="vaadin-chart-1"
              type="column"
              categories='["Jan", "Feb", "Mar"]'
              additional-options='{
              "yAxis": {
                "title": {
                  "text": ""
                }
              }
            }'
            >
              <vaadin-chart-series
                title="Tokyo"
                values="[49.9, 71.5, 106.4]"
              >
              </vaadin-chart-series>
              <vaadin-chart-series
                title="New York"
                values="[83.6, 78.8, 98.5]"
              >
              </vaadin-chart-series>
              <vaadin-chart-series
                title="London"
                values="[48.9, 38.8, 39.3]"
              >
              </vaadin-chart-series>
            </vaadin-chart>
        </div>
        
        <div class="panel dark">
          <vaadin-chart
            style="height: 300px;"
            type="area"
            stacking="normal"
            categories='["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]'
            tooltip
            no-legend
            additional-options='{
            "yAxis": {
              "title": {
                "text": ""
              }
            },
             "xAxis": {
              "visible":false
            },
            "plotOptions": {
              "series": {
                "marker": {
                  "enabled": false
                }
              }
            }
            }'
          >
            <vaadin-chart-series title="United States dollar" values="[135, 125, 89, 124, 105, 81, 111, 94, 95, 129, 98, 84]">
            </vaadin-chart-series>
            <vaadin-chart-series title="Euro" values="[62, 72, 89, 68, 94, 92, 110, 100, 109, 89, 86, 105]">
            </vaadin-chart-series>
            <vaadin-chart-series title="Japanese yen" values="[30, 25, 32, 26, 15, 31, 24, 32, 21, 8, 12, 32]">
            </vaadin-chart-series>
            <vaadin-chart-series title="Poud sterling" values="[32, 21, 8, 12, 32, 21, 12, 30, 25, 19, 26, 15]">
            </vaadin-chart-series>
          </vaadin-chart>
        </div>
        
        <div class="panel dark">
            <vaadin-chart
              style="height: 300px;"
              type="pie"
              tooltip
              additional-options='{
              "tooltip": {
                "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
              },
              "plotOptions": {
                "pie": {
                  "allowPointSelect":true,
                  "cursor": "pointer",
                  "innerSize": "60%"
                }
              }
            }'
            >
              <vaadin-chart-series
                title="Brands"
                values='[
                {
                  "name": "Chrome",
                  "y": 38
                },
                {
                  "name": "Firefox",
                  "y": 24
                },
                {
                  "name": "Edge",
                  "y": 15,
                  "sliced": true,
                  "selected": true
                },
                {
                  "name": "Internet Explorer",
                  "y": 8
                }
            ]'
              ></vaadin-chart-series>
            </vaadin-chart>
        </div>
        
        <div class="panel">
          <vaadin-chart
            style="height: 300px;"
            polar
            additional-options='{
              "xAxis": {
                "tickInterval": 45,
                "min": 0,
                "max": 360,
                "labels": {},
                "visible":false
              },
              "yAxis": {
                "min":0
              },
              "plotOptions": {
                "series": {
                  "pointStart": 0,
                  "pointInterval":45
                },
                "column": {
                  "pointPadding": 0,
                  "groupPadding": 0
                }
              }
            }'
          >
            <vaadin-chart-series
              type="column"
              title="Column"
              values="[8, 7, 6, 5, 4, 3, 2, 1]"
              additional-options='{
                "pointPlacement": "between"
              }'
            ></vaadin-chart-series>
            <vaadin-chart-series type="line" title="Line" values="[1, 2, 3, 4, 5, 6, 7, 8]"> </vaadin-chart-series>
            <vaadin-chart-series type="area" title="Area" values="[1, 8, 2, 7, 3, 6, 4, 5]"> </vaadin-chart-series>
          </vaadin-chart>
        </div>
      </div>
    `;
  }
}
