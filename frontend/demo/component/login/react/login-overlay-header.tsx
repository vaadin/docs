import { reactExample } from 'Frontend/demo/react-example'; // hidden-source-line
import React from 'react';
import { LoginOverlay } from '@vaadin/react-components/LoginOverlay.js';

function Example() {
  return (
    // tag::snippet[]
    <LoginOverlay title="TaskMob" description="Built with ♥ by Vaadin" opened autofocus />
    // end::snippet[]
  );
}

export default reactExample(Example); // hidden-source-line
