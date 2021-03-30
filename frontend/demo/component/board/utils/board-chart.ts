import { getViewEvents } from 'Frontend/demo/domain/DataService'; // hidden-full-source-line
import ViewEvent from 'Frontend/generated/com/vaadin/demo/domain/ViewEvent'; // hidden-full-source-line

import '@vaadin/vaadin-charts';
import { html, LitElement, customElement, internalProperty, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { applyTheme } from 'Frontend/generated/theme';

const monthNames: readonly string[] = [
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
} as const;

@customElement('board-chart')
export class Example extends LitElement {
  static get styles() {
    return css`
      .title {
        font-size: var(--lumo-font-size-xl);
        font-weight: 700;
        margin-block-end: var(--lumo-space-m);
      }
    `;
  }

  @internalProperty()
  private events: readonly ViewEvent[] = [];

  constructor() {
    super();
    // Apply custom theme (only supported if your app uses one)
    applyTheme(this.shadowRoot);
  }

  async firstUpdated() {
    this.events = await getViewEvents();
  }

  render() {
    return html`
      <header class="title">View events</header>
      <vaadin-chart .additionalOptions=${chartOptions} .categories=${monthNames} type="area">
        ${repeat(
          this.events,
          ({ id }) => id,
          ({ city, data }) =>
            html`<vaadin-chart-series .title=${city} .values=${data}></vaadin-chart-series>`
        )}
      </vaadin-chart>
    `;
  }
}
