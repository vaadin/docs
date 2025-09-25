import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Chart } from '@vaadin/react-components-pro/Chart.js';
import { ChartSeries } from '@vaadin/react-components-pro/ChartSeries.js';

function Example() {
  return (
    // tag::snippet[]
    <Chart
      type="area"
      title="Area Chart"
      stacking="normal"
      categories={'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')}
    >
      <ChartSeries
        title="United States dollar"
        values={[135, 125, 89, 124, 105, 81, 111, 94, 95, 129, 98, 84]}
      />
      <ChartSeries title="Euro" values={[62, 72, 89, 68, 94, 92, 110, 100, 109, 89, 86, 105]} />
      <ChartSeries title="Japanese yen" values={[30, 25, 32, 26, 15, 31, 24, 32, 21, 8, 12, 32]} />
      <ChartSeries
        title="Pound sterling"
        values={[32, 21, 8, 12, 32, 21, 12, 30, 25, 19, 26, 15]}
      />
    </Chart>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
