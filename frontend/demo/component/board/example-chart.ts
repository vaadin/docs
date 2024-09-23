import '@vaadin/charts';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { getViewEvents } from 'Frontend/demo/domain/DataService';
import type ViewEvent from 'Frontend/generated/com/vaadin/demo/domain/ViewEvent';

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
  static override styles = css`
    .title {
      font-size: var(--lumo-font-size-l);
      font-weight: 700;
      margin-block-end: var(--lumo-space-m);
    }
  `;

  @state()
  private events: ViewEvent[] = [];

  protected override async firstUpdated() {
    this.events = await getViewEvents();
  }

  protected override render() {
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
