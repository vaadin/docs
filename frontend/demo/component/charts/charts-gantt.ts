import 'Frontend/demo/init'; // hidden-source-line
import '@vaadin/charts';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { applyTheme } from 'Frontend/generated/theme';

@customElement('charts-gantt')
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
      <vaadin-chart
        type="gantt"
        title="Gantt Chart"
        additional-options='{
                  "xAxis": {
                      "min": 1416182400000,
                      "max": 1417305600000
                  },
                  "yAxis":{
                     "categories":[
                        "Start prototype",
                        "Test prototype",
                        "Develop",
                        "Run acceptance tests"
                     ]
                  }
               }'
      >
        <vaadin-chart-series
          values='[{
            "y":0,
            "start": 1416268800000,
            "end": 1416873600000,
            "assignee":"John",
            "completed": 0.25
        }, {
            "y":1,
            "start": 1417046400000,
            "end": 1417219200000,
            "assignee":"William"
        }, {
            "y":2,
            "start": 1416441600000,
            "end": 1416873600000,
            "assignee":"Jane",
            "completed": 0.4
        }, {
            "y":2,
            "start": 1417046400000,
            "end": 1417219200000,
             "assignee":"Jane"
        }, {
            "y":3,
            "start": 1416700800000,
            "end": 1416960000000,
            "assignee":"John",
            "completed": 0.25
        }]'
          additional-options='{
      "dataLabels": [{
            "enabled":true,
            "format":"<div>{point.assignee}</vaadin-avatar>",
            "useHTML":true,
            "align":"right"
         }]}'
        ></vaadin-chart-series>
      </vaadin-chart>
      <!-- end::snippet[] -->
    `;
  }
}
