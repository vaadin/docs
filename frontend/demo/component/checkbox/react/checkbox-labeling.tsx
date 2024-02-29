import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Checkbox } from '@vaadin/react-components';

function Example() {
  // tag::snippet[]
  return <Checkbox label="Yes, I agree" />;
  // end::snippet[]
}

export default reactExample(Example); // hidden-source-line
