import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Button } from '@hilla/react-components/Button.js';

function Example() {
  return (
    // tag::snippet[]
    <Button theme="tertiary-inline">Tertiary inline</Button>
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
