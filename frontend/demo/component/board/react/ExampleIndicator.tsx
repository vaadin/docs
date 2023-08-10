import React, { useMemo } from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

// tag::snippet[]
function ExampleIndicator({ title = 'Unknown', current = '0', change = 0 }) {
  let theme;
  let icon;
  let sign;

  if (change === 0) {
    theme = '';
    icon = 'circle-thin';
    sign = '±';
  } else if (change < 0) {
    theme = 'error';
    icon = 'arrow-down';
    sign = '-';
  } else {
    theme = 'success';
    icon = 'arrow-up';
    sign = '+';
  }

  return (
    <VerticalLayout className="example-indicator">
      <div className="title">{title}</div>
      <div className="current">{current}</div>
      <span className={`icon badge`} {...{ theme: `badge ${theme}` }}>
        <Icon icon={`vaadin:${icon}`} />
        <span>
          {sign}
          {Math.abs(change).toFixed(2)}%
        </span>
      </span>
    </VerticalLayout>
  );
}
// end::snippet[]

export default ExampleIndicator;
