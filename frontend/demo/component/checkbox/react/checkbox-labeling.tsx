import React from 'react';
import { Checkbox } from '@vaadin/react-components/Checkbox.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

function Example() {
  // tag::snippet[]
  return <Checkbox label="Yes, I agree" />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
