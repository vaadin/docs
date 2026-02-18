import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Slider } from '@vaadin/react-components/Slider.js';

function Example() {
  return (
    // tag::snippet[]
    <Slider label="Volume" value={50} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
