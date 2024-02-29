import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@vaadin/react-components';

function Example() {
  return (
    // tag::snippet[]
    <Button focus-ring>Keyboard focus</Button>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
