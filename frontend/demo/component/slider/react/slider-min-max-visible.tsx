import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Slider } from '@vaadin/react-components/Slider.js';

function Example() {
  return (
    // tag::snippet[]
    <Slider label="Temperature" min={0} max={100} value={50} minMaxVisible />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
