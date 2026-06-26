import '@vaadin/charts';
import '@vaadin/progress-bar';
import { html } from 'lit';

const countryData = [
  { flag: '🇺🇸', name: 'United States', visitors: 12847 },
  { flag: '🇬🇧', name: 'United Kingdom', visitors: 6211 },
  { flag: '🇩🇪', name: 'Germany', visitors: 4105 },
  { flag: '🇫🇷', name: 'France', visitors: 3542 },
  { flag: '🇯🇵', name: 'Japan', visitors: 2891 },
  { flag: '🇧🇷', name: 'Brazil', visitors: 1764 },
];

const totalVisitors = countryData.reduce((sum, c) => sum + c.visitors, 0);

const browserData = [
  { name: 'Chrome', share: '64%' },
  { name: 'Firefox', share: '18%' },
  { name: 'Safari', share: '12%' },
  { name: 'Edge', share: '4%' },
  { name: 'Other', share: '2%' },
];

const trafficData = [
  { name: 'Organic', share: '43%' },
  { name: 'Direct', share: '27%' },
  { name: 'Social', share: '18%' },
  { name: 'Referral', share: '12%' },
];

function renderKpiWidget(value: string, trend: string, trendUp: boolean) {
  return html`
    <div class="dashboard-kpi-widget">
      <span class="kpi-value">${value}</span>
      <div class="kpi-footer">
        <span class="${trendUp ? 'kpi-trend-up' : 'kpi-trend-down'}">${trend}</span>
        <span>vs last month</span>
      </div>
    </div>
  `;
}

export function renderVisitorsWidget() {
  return renderKpiWidget('54,238', '+12.3%', true);
}

export function renderDownloadsWidget() {
  return renderKpiWidget('11,842', '-3.8%', false);
}

export function renderConversionsWidget() {
  return renderKpiWidget('1,025', '+8.1%', true);
}

export function renderVisitorsByCountryWidget() {
  return html`
    <div class="dashboard-country-list-widget">
      ${countryData.map(
        ({ flag, name, visitors }) => html`
          <div class="country-row">
            <div class="country-header">
              <span class="country-name">${flag} ${name}</span>
              <span class="country-count">${visitors.toLocaleString()}</span>
            </div>
            <vaadin-progress-bar .value="${visitors / totalVisitors}"></vaadin-progress-bar>
          </div>
        `
      )}
    </div>
  `;
}

function renderShareList(items: Array<{ name: string; share: string }>) {
  return html`
    <div class="dashboard-share-list-widget">
      ${items.map(
        ({ name, share }) => html`
          <div class="share-row">
            <span>${name}</span>
            <span class="share-value">${share}</span>
          </div>
        `
      )}
    </div>
  `;
}

export function renderBrowsersWidget() {
  return renderShareList(browserData);
}

export function renderTrafficSourcesWidget() {
  return renderShareList(trafficData);
}

export function renderVisitorsPerMonthWidget() {
  return html`
    <vaadin-chart
      type="line"
      no-legend
      .categories="${'Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec,Jan,Feb'.split(',')}"
      .additionalOptions="${{
        yAxis: { title: { text: null } },
        tooltip: { valueSuffix: ' visitors' },
      }}"
    >
      <vaadin-chart-series
        title="Visitors"
        .values="${[
          39210, 42500, 45890, 48120, 51340, 49870, 46200, 48750, 50100, 52400, 51030, 54238,
        ]}"
      ></vaadin-chart-series>
    </vaadin-chart>
  `;
}
