import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Select } from '@hilla/react-components/Select.js';

function Example() {
  const items = [
    {
      label: 'XS',
      value: 'xs',
    },
    {
      label: 'S',
      value: 's',
    },
    {
      label: 'M',
      value: 'm',
    },
    {
      label: 'L',
      value: 'l',
    },
    {
      label: 'XL',
      value: 'xl',
    },
  ];

  return (
    // tag::snippet[]
    <Select label="Size" placeholder="Select size" items={items} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
