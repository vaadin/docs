import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { LoginOverlay } from '@hilla/react-components/LoginOverlay.js';

// tag::snippet[]
function Example() {
  return <LoginOverlay opened error no-autofocus />;
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
