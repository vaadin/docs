import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RangeSlider } from '@vaadin/react-components/RangeSlider.js';

function Example() {
  // TODO add these properties
  // accessibleNameStart="Minimum price"
  // accessibleNameEnd="Maximum price"
  return (
    // tag::snippet[]
    <RangeSlider
      label="Price range"
      min={0}
      max={1000}
      value={[200, 800]}
    />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
