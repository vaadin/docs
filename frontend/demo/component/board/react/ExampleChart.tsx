import React, { useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime'; // hidden-source-line
import { useSignal } from '@vaadin/hilla-react-signals';
import { Chart } from '@vaadin/react-components-pro/Chart.js';
import { ChartSeries } from '@vaadin/react-components-pro/ChartSeries.js';
import { getViewEvents } from 'Frontend/demo/domain/DataService';
import type ViewEvent from 'Frontend/generated/com/vaadin/demo/domain/ViewEvent';

const titleStyle = {
  fontSize: '1.125rem',
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
  useSignals(); // hidden-source-line
  const events = useSignal<ViewEvent[]>([]);
  useEffect(() => {
    getViewEvents().then((viewEvents) => {
      events.value = viewEvents;
    });
  }, []);

  return (
    <div>
      <header style={titleStyle}>View events</header>

      <Chart additionalOptions={chartOptions} categories={monthNames} type="area">
        {events.value.map(({ id, city, data }) => (
          <ChartSeries title={city} values={data} key={id} />
        ))}
      </Chart>
    </div>
  );
}
// end::snippet[]

export default Example; // hidden-source-line
