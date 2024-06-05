import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Chart } from '@vaadin/react-components-pro/Chart.js';
import { ChartSeries } from '@vaadin/react-components-pro/ChartSeries.js';

function Example() {
  return (
    // tag::snippet[]
    <Chart type="pie" title="Pie Chart" tooltip>
      <ChartSeries
        title="Brands"
        values={[
          { name: 'Chrome', y: 38 },
          { name: 'Firefox', y: 24 },
          { name: 'Edge', y: 15, sliced: true, selected: true },
          { name: 'Internet Explorer', y: 8 },
        ]}
      />
    </Chart>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
