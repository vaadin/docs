import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RangeSlider } from '@vaadin/react-components/RangeSlider.js';

function Example() {
  return (
    // tag::snippet[]
    // TODO: add valueAlwaysVisible
    <RangeSlider label="Brightness" min={0} max={100} value={[25, 75]} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
