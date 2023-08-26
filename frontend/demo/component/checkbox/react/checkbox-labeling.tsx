import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { Checkbox } from '@hilla/react-components/Checkbox.js';

function Example() {
  return <Checkbox label="Yes, I agree" />;
}

export default reactExample(Example); // hidden-source-line
