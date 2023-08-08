import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Select } from '@hilla/react-components/Select.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { Icon } from '@hilla/react-components/Icon.js';
import '@vaadin/icons';

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
    <Select label="Label" helperText="Helper text" placeholder="Placeholder" items={items}>
      <Tooltip slot="tooltip" text="Tooltip text" />
      <Icon slot="prefix" icon="vaadin:vaadin-h" />
    </Select>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
