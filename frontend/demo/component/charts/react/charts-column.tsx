import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Chart } from '@vaadin/react-components-pro/Chart.js';
import { ChartSeries } from '@vaadin/react-components-pro/ChartSeries.js';

function Example() {
  return (
    // tag::snippet[]
    <Chart title="Column Chart" type="column" categories={['Jan', 'Feb', 'Mar']}>
      <ChartSeries title="Tokyo" values={[49.9, 71.5, 106.4]} />
      <ChartSeries title="New York" values={[83.6, 78.8, 98.5]} />
      <ChartSeries title="London" values={[48.9, 38.8, 39.3]} />
    </Chart>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
