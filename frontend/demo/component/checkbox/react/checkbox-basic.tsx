import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Checkbox } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <Checkbox label="I accept the terms and conditions" />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
