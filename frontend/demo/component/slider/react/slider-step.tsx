import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Slider } from '@vaadin/react-components/Slider.js';

function Example() {
  return (
    // tag::snippet[]
    <Slider label="Volume" min={0} max={10} value={5} step={0.5} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
