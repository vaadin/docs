import '@vaadin/vaadin-charts/vaadin-chart';
import { css, customElement, html, LitElement, state } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

interface ViewEvent {
  readonly data?: ReadonlyArray<number>;
  readonly id?: number;
  readonly city?: string;
}

const demoData: ViewEvent[] = [
  {
    city: 'Berlin',
    data: [189, 191, 191, 196, 201, 203, 209, 212, 229, 242, 244, 247],
    id: 0
  },
  {
    city: 'London',
    data: [138, 146, 148, 148, 152, 153, 163, 173, 178, 179, 185, 187],
    id: 1
  },
  {
    city: 'New York',
    data: [65, 65, 66, 71, 93, 102, 108, 117, 127, 129, 135, 136],
    id: 2
  },
  {
    city: 'Tokyo',
    data: [0, 11, 17, 23, 30, 42, 48, 49, 52, 54, 58, 62],
    id: 3
  }
];

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
  'Dec'
];

const chartOptions = {
  xAxis: { crosshair: true },
  yAxis: { min: 0 }
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

  @state()
  private events: ViewEvent[] = demoData;

  render() {
    return html`
      <header class="title">View events</header>
      <vaadin-chart .additionalOptions="${chartOptions}" .categories="${monthNames}" type="area">
        ${repeat(
          this.events,
          ({ id }) => id,
          ({ city, data }) =>
            html`
              <vaadin-chart-series .title="${city}" .values="${data}"></vaadin-chart-series>
            `
        )}
      </vaadin-chart>
    `;
  }
}
