import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Select } from '@hilla/react-components/Select.js';

function Example() {
  const items = [
    {
      label: 'Most recent first',
      value: 'recent',
    },
    {
      label: 'Rating: high to low',
      value: 'rating-desc',
    },
    {
      label: 'Rating: low to high',
      value: 'rating-asc',
    },
    {
      label: 'Price: high to low',
      value: 'price-desc',
    },
    {
      label: 'Price: low to high',
      value: 'price-asc',
    },
  ];

  return (
    // tag::snippet[]
    <Select
      theme="align-right small helper-above-field"
      label="Label"
      helperText="Helper text"
      style={{ '--vaadin-input-field-border-width': '1px' } as React.CSSProperties}
      items={items}
      value={items[0].value}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
