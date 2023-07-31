import { reactExample } from 'Frontend/demo/react-example';
import React from 'react';
import { Chart } from '@hilla/react-components/Chart.js';
import { Axis } from '@hilla/react-components/Axis.js';
import { Series } from '@hilla/react-components/Series.js';
import { useTheme } from '@hilla/react-components/Theme.js';

function Example() {
  const theme = useTheme();
  return (
    <>
      {/* tag::snippet[] */}
      <Chart type="column" categories={['Jan', 'Feb', 'Mar']}>
        <Axis id="xAxis" labels={{ enabled: false }} />
        <Axis id="yAxis" title="" />

        <Series title="Tokyo" values={[49.9, 71.5, 106.4]} />
        <Series title="New York" values={[83.6, 78.8, 98.5]} />
        <Series title="London" values={[48.9, 38.8, 39.3]} />
      </Chart>

      <Chart type="area" categories={monthOptions.months}>
        <Axis id="xAxis" labels={{ enabled: false }} />
        <Axis id="yAxis" title="" />

        <Series
          title="United States dollar"
          values={[135, 125, 89, 124, 105, 81, 111, 94, 95, 129, 98, 84]}
        />
        <Series title="Euro" values={[62, 72, 89, 68, 94, 92, 110, 100, 109, 89, 86, 105]} />
        <Series title="Japanese yen" values={[30, 25, 32, 26, 15, 31, 24, 32, 21, 8, 12, 32]} />
        <Series title="Poud sterling" values={[32, 21, 8, 12, 32, 21, 12, 30, 25, 19, 26, 15]} />
      </Chart>

      <Chart type="pie" tooltip>
        <Series title="Brands" values={[38, 24, 15, 8]} />
      </Chart>

      <Chart polar>
        <Series
          type="column"
          title="Column"
          values={[8, 7, 6, 5, 4, 3, 2, 1]}
          additionalOptions={{ pointPlacement: 'between' }}
        />
        <Series type="line" title="Line" values={[1, 2, 3, 4, 5, 6, 7, 8]} />
        <Series type="area" title="Area" values={[1, 8, 2, 7, 3, 6, 4, 5]} />
      </Chart>

      <label>
        Theme:
        <select onChange={theme.set}>
          <option value="">Default</option>
          <option value="gradient">Gradient</option>
          <option value="monotone">Monotone</option>
          <option value="classic">Classic</option>
        </select>
      </label>
      {/* end::snippet[] */}
    </>
  );
}

export default reactExample(Example);
