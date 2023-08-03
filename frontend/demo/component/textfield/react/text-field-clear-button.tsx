import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { TextField } from '@hilla/react-components/TextField.js';

function Example() {
  return (
    // tag::snippet[]
    <TextField value="Value" clearButtonVisible />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
