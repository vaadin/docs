import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Select } from '@hilla/react-components/Select.js';

// tag::snippet[]
function Example() {
  const items = [
    {
      label: 'Most recent first',
      value: 'recent',
    },
    {
      component: 'hr',
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
      component: 'hr',
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

  return <Select label="Sort by" items={items} value={items[0].value} />;
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
