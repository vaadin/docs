import React, { useEffect, useState } from 'react';
import { Chart } from '@hilla/react-components/Chart.js';
import { ChartSeries } from '@hilla/react-components/ChartSeries.js';
import { getViewEvents } from 'Frontend/demo/domain/DataService';
import type ViewEvent from 'Frontend/generated/com/vaadin/demo/domain/ViewEvent';

const titleStyle = {
  fontSize: 'var(--lumo-font-size-l)',
  fontWeight: 700,
  marginBlockEnd: 'var(--lumo-space-m)',
};

// tag::snippet[]
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

function Example() {
  const [events, setEvents] = useState<ViewEvent[]>([]);
  useEffect(() => {
    getViewEvents().then((viewEvents) => setEvents(viewEvents));
  }, []);

  return (
    <div>
      <header style={titleStyle}>View events</header>

      <Chart additionalOptions={chartOptions} categories={monthNames} type="area">
        {events.map(({ id, city, data }) => (
          <ChartSeries title={city} values={data} key={id} />
        ))}
      </Chart>
    </div>
  );
}
// end::snippet[]

export default Example; // hidden-source-line
