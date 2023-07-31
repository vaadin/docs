import { reactExample } from 'Frontend/demo/react-example';
import React, { useEffect, useState } from 'react';
import { Chart } from '@hilla/react-components/Chart.js';
import { ChartSeries } from '@hilla/react-components/ChartSeries.js';

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
    getViewEvents().then((events) => setEvents(events));
  }, []);

  return (
    <>
      <header className="title">View events</header>
      <Chart additionalOptions={chartOptions} categories={monthNames} type="area">
        {events.map(({ id, city, data }) => (
          <ChartSeries title={city} values={data} key={id} />
        ))}
      </Chart>
    </>
  );
}
// end::snippet[]

export default reactExample(Example);
