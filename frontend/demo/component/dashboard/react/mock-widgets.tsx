import React from 'react';
import { ProgressBar } from '@vaadin/react-components/ProgressBar.js';
import { Chart } from '@vaadin/react-components-pro/Chart.js';
import { ChartSeries } from '@vaadin/react-components-pro/ChartSeries.js';

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
  { name: 'Chrome', share: 64 },
  { name: 'Firefox', share: 18 },
  { name: 'Safari', share: 12 },
  { name: 'Edge', share: 4 },
  { name: 'Other', share: 2 },
];

const trafficData = [
  { name: 'Organic', share: 43 },
  { name: 'Direct', share: 27 },
  { name: 'Social', share: 18 },
  { name: 'Referral', share: 12 },
];

function KpiWidget({ value, trend, trendUp }: { value: string; trend: string; trendUp: boolean }) {
  return (
    <div className="dashboard-kpi-widget">
      <span className="kpi-value">{value}</span>
      <div className="kpi-footer">
        <span className={trendUp ? 'kpi-trend-up' : 'kpi-trend-down'}>{trend}</span>
        <span>vs last month</span>
      </div>
    </div>
  );
}

export function VisitorsWidget() {
  return <KpiWidget value="54,238" trend="+12.3%" trendUp />;
}

export function DownloadsWidget() {
  return <KpiWidget value="11,842" trend="-3.8%" trendUp={false} />;
}

export function ConversionsWidget() {
  return <KpiWidget value="1,025" trend="+8.1%" trendUp />;
}

export function VisitorsByCountryWidget() {
  return (
    <div className="dashboard-country-list-widget">
      {countryData.map(({ flag, name, visitors }) => (
        <div key={name} className="country-row">
          <div className="country-header">
            <span className="country-name">
              {flag} {name}
            </span>
            <span className="country-count">{visitors.toLocaleString()}</span>
          </div>
          <ProgressBar value={visitors / totalVisitors} />
        </div>
      ))}
    </div>
  );
}

export function BrowsersWidget() {
  return (
    <div className="dashboard-share-list-widget">
      {browserData.map(({ name, share }) => (
        <div key={name} className="share-row">
          <span>{name}</span>
          <span className="share-value">{share}%</span>
        </div>
      ))}
    </div>
  );
}

export function TrafficSourcesWidget() {
  return (
    <div className="dashboard-share-list-widget">
      {trafficData.map(({ name, share }) => (
        <div key={name} className="share-row">
          <span>{name}</span>
          <span className="share-value">{share}%</span>
        </div>
      ))}
    </div>
  );
}

export function VisitorsPerMonthWidget() {
  return (
    <Chart
      type="line"
      categories={'Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec,Jan,Feb'.split(',')}
      noLegend
      additionalOptions={{
        yAxis: { title: { text: null } },
        tooltip: { valueSuffix: ' visitors' },
      }}
    >
      <ChartSeries
        title="Visitors"
        values={[
          39210, 42500, 45890, 48120, 51340, 49870, 46200, 48750, 50100, 52400, 51030, 54238,
        ]}
      />
    </Chart>
  );
}
