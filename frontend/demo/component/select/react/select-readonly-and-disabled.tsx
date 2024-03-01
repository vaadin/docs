import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Select } from '@vaadin/react-components/Select.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';

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
    <HorizontalLayout theme="spacing">
      {/* tag::snippet[] */}
      <Select label="Read-only" value={items[0].value} items={items} readonly />

      <Select label="Disabled" disabled />
      {/* end::snippet[] */}
    </HorizontalLayout>
  );
}

export default reactExample(Example); // hidden-source-line
