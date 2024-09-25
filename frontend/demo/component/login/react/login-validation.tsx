import React from 'react';
import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';
import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line

// tag::snippet[]
function Example() {
  return <LoginOverlay opened error no-autofocus />;
}
// end::snippet[]

export default reactExample(Example); // hidden-source-line
