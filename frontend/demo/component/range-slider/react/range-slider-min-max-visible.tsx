import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { RangeSlider } from '@vaadin/react-components/RangeSlider.js';

function Example() {
  return (
    // tag::snippet[]
    // TODO: add minMaxVisible
    <RangeSlider label="Temperature" min={0} max={100} value={[20, 80]} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
