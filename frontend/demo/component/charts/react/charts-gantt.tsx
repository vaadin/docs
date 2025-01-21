import {reactExample} from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import {Chart} from '@vaadin/react-components-pro/Chart.js';
import {ChartSeries} from '@vaadin/react-components-pro/ChartSeries.js';

function Example() {
  return (
    // tag::snippet[]
    <Chart
      type="gantt"
      title="Gantt Chart"
      additionalOptions={{
        xAxis: {
          min: 1416182400000,
          max: 1417305600000,
        },
        yAxis: {
          categories: ['Start prototype', 'Test prototype', 'Develop', 'Run acceptance tests'],
        },
      }}>
      <ChartSeries values={[
        {
          y: 0,
          start: 1416268800000,
          end: 1416873600000,
          custom: {
            assignee: 'John',
          },
          completed: 0.33,
        },
        {
          y: 1,
          start: 1417046400000,
          end: 1417219200000,
          custom: {
            assignee: 'William',
          },
        },
        {
          y: 2,
          start: 1416441600000,
          end: 1416873600000,
          custom: {
            assignee: 'Jane',
          },
          completed: 0.4,
        },
        {
          y: 2,
          start: 1417046400000,
          end: 1417219200000,
          custom: {
            assignee: 'Jane',
          },
        },
        {
          y: 3,
          start: 1416700800000,
          end: 1416960000000,
          custom: {
            assignee: 'John',
          },
          completed: 0.25,
        },
      ]}

      additionalOptions={{
        type: 'gantt',
        dataLabels: [{
          enabled: true,
          format: '<div>{point.custom.assignee}</vaadin-avatar>',
          useHTML: true,
          align: 'right',
        }],
      }}/>
    </Chart>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
