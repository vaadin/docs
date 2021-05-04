import { getViewEvents } from 'Frontend/demo/domain/DataService'; // hidden-source-line
import ViewEvent from 'Frontend/generated/com/vaadin/demo/domain/ViewEvent'; // hidden-source-line

import '@vaadin/vaadin-charts/vaadin-chart';
import { html, LitElement, customElement, internalProperty, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

const monthNames = [
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

const chartOptions = {
  xAxis: { crosshair: true },
  yAxis: { min: 0 },
};

@customElement('example-chart')
export class Example extends LitElement {
  static get styles() {
    return css`
      .title {
        font-size: var(--lumo-font-size-l);
        font-weight: 700;
        margin-block-end: var(--lumo-space-m);
      }
    `;
  }

  @internalProperty()
  private events: ViewEvent[] = [];

  async firstUpdated() {
    this.events = await getViewEvents();
  }

  render() {
    return html`
      <header class="title">View events</header>
      <vaadin-chart .additionalOptions="${chartOptions}" .categories="${monthNames}" type="area">
        ${repeat(
          this.events,
          ({ id }) => id,
          ({ city, data }) =>
            html`<vaadin-chart-series .title="${city}" .values="${data}"></vaadin-chart-series>`
        )}
      </vaadin-chart>
    `;
  }
}
