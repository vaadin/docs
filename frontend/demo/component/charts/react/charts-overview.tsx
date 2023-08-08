import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React, { useState } from 'react';
import { Chart } from '@hilla/react-components/Chart.js';
import { ChartSeries } from '@hilla/react-components/ChartSeries.js';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const hostStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  backgroundColor: 'var(--docs-surface-color-2)',
  padding: '0.5rem',
  paddingTop: '1.5rem',
  position: 'relative',
};

const chartStyle: React.CSSProperties = {
  padding: '0.5rem',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  zIndex: 1,
  top: '0.5rem',
  left: '1rem',
  fontSize: 'var(--docs-font-size-2xs)',
  fontWeight: 'var(--docs-font-weight-emphasis)',
  position: 'absolute',
};

const selectStyle = {
  font: 'inherit',
};

function Example() {
  const [theme, setTheme] = useState('');

  function changeTheme(e: React.ChangeEvent<HTMLSelectElement>) {
    setTheme(e.target.value);
  }

  return (
    <div style={hostStyle}>
      {/* tag::snippet[] */}
      <Chart theme={theme} style={chartStyle} type="column" categories={['Jan', 'Feb', 'Mar']}>
        <ChartSeries title="Tokyo" values={[49.9, 71.5, 106.4]} />
        <ChartSeries title="New York" values={[83.6, 78.8, 98.5]} />
        <ChartSeries title="London" values={[48.9, 38.8, 39.3]} />
      </Chart>

      <Chart theme={theme} style={chartStyle} type="area" categories={months}>
        <ChartSeries
          title="United States dollar"
          values={[135, 125, 89, 124, 105, 81, 111, 94, 95, 129, 98, 84]}
        />
        <ChartSeries title="Euro" values={[62, 72, 89, 68, 94, 92, 110, 100, 109, 89, 86, 105]} />
        <ChartSeries
          title="Japanese yen"
          values={[30, 25, 32, 26, 15, 31, 24, 32, 21, 8, 12, 32]}
        />
        <ChartSeries
          title="Poud sterling"
          values={[32, 21, 8, 12, 32, 21, 12, 30, 25, 19, 26, 15]}
        />
      </Chart>

      <Chart theme={theme} style={chartStyle} type="pie" tooltip>
        <ChartSeries title="Brands" values={[38, 24, 15, 8]} />
      </Chart>

      <Chart theme={theme} style={chartStyle} polar>
        <ChartSeries
          type="column"
          title="Column"
          values={[8, 7, 6, 5, 4, 3, 2, 1]}
          // additionalOptions={{ pointPlacement: 'between' }}
        />
        <ChartSeries type="line" title="Line" values={[1, 2, 3, 4, 5, 6, 7, 8]} />
        <ChartSeries type="area" title="Area" values={[1, 8, 2, 7, 3, 6, 4, 5]} />
      </Chart>

      <label style={labelStyle}>
        Theme:
        <select style={selectStyle} onChange={changeTheme}>
          <option value="">Default</option>
          <option value="gradient">Gradient</option>
          <option value="monotone">Monotone</option>
          <option value="classic">Classic</option>
        </select>
      </label>
      {/* end::snippet[] */}
    </div>
  );
}

export default reactExample(Example); // hidden-source-line
