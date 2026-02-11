import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Slider } from '@vaadin/react-components/Slider.js';

function Example() {
  return (
    // tag::snippet[]
    // TODO: add valueAlwaysVisible
    <Slider label="Brightness" min={0} max={100} value={75} />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
