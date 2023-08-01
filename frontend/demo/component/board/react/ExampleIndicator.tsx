import React, { useMemo } from 'react';
import { VerticalLayout } from '@hilla/react-components/VerticalLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';

function ExampleIndicator({ title = 'Unknown', current = '0', change = 0 }) {
  const theme = useMemo(() => {
    if (change === 0) {
      return '';
    } else if (change < 0) {
      return 'error';
    }
    return 'success';
  }, [change]);

  const icon = useMemo(() => {
    if (change === 0) {
      return 'circle-thin';
    } else if (change < 0) {
      return 'arrow-down';
    }
    return 'arrow-up';
  }, [change]);

  const sign = useMemo(() => {
    if (change === 0) {
      return '±';
    } else if (change < 0) {
      return '-';
    }
    return '+';
  }, [change]);

  return (
    <VerticalLayout>
      <div className="title">{title}</div>
      <div className="current">{current}</div>
      <span className={`icon badge ${theme}`}>
        <Icon icon={`vaadin:${icon}`} />
        <span>
          {sign}
          {Math.abs(change).toFixed(2)}%
        </span>
      </span>
    </VerticalLayout>
  );
}

export default ExampleIndicator;
