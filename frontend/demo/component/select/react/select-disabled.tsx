import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Select } from '@hilla/react-components/Select.js';

// tag::snippet[]
function Example() {
  const items = [
    {
      label: 'XS (out of stock)',
      value: 'xs',
      disabled: true,
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

  return <Select label="Size" items={items} value={items[4].value} />;
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
